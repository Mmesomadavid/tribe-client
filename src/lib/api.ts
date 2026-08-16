// src/lib/api.ts

// ============================================================
// BASE URL
// ============================================================

export const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

export const AUTH_BASE =
  `${API_URL}/api/auth`;

export const POSTS_BASE =
  `${API_URL}/api/posts`;

// ============================================================
// API ERROR
// ============================================================

export class ApiError extends Error {
  status: number;
  data?: any;

  constructor(
    message: string,
    status: number,
    data?: any
  ) {
    super(message);

    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

// ============================================================
// ACCESS TOKEN
//
// Kept in memory (not localStorage).
// AuthContext writes through to these functions.
// ============================================================

let inMemoryAccessToken: string | null = null;

export const getAccessToken = (): string | null => {
  return inMemoryAccessToken;
};

export const setAccessToken = (token: string): void => {
  inMemoryAccessToken = token;
};

export const clearAccessToken = (): void => {
  inMemoryAccessToken = null;
};

// ============================================================
// API FETCH
// ============================================================

export async function apiFetch<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAccessToken();

  // Create a mutable Headers object from any headers
  // supplied by the caller.
  const headers = new Headers(options.headers);

  // ==========================================================
  // CONTENT-TYPE
  // ==========================================================
  //
  // IMPORTANT:
  //
  // Do NOT manually set Content-Type when using FormData.
  //
  // The browser automatically generates:
  //
  // multipart/form-data; boundary=----WebKitFormBoundary...
  //
  // If we manually set application/json here, multer will
  // never receive the uploaded file correctly.
  //

  if (
    options.body &&
    !(options.body instanceof FormData) &&
    !headers.has("Content-Type")
  ) {
    headers.set(
      "Content-Type",
      "application/json"
    );
  }

  // ==========================================================
  // AUTHORIZATION
  // ==========================================================

  if (token) {
    headers.set(
      "Authorization",
      `Bearer ${token}`
    );
  }

  // ==========================================================
  // REQUEST URL
  // ==========================================================

  const url = `${API_URL}${path}`;

  console.log("🌐 API REQUEST", {
    method: options.method || "GET",
    url,
    authenticated: Boolean(token),
    contentType: headers.get("Content-Type"),
    isFormData: options.body instanceof FormData,
  });

  // ==========================================================
  // SEND REQUEST
  // ==========================================================

  let res: Response;

  try {
    res = await fetch(url, {
      ...options,
      credentials: "include",
      headers,
    });
  } catch (error) {
    console.error(
      "❌ Network request failed:",
      error
    );

    throw new ApiError(
      "Unable to connect to the server. Make sure the backend is running.",
      0,
      error
    );
  }

  // ==========================================================
  // PARSE RESPONSE
  // ==========================================================

  const data = await res
    .json()
    .catch(() => ({}));

  console.log("🌐 API RESPONSE", {
    status: res.status,
    url,
    data,
  });

  // ==========================================================
  // HANDLE API ERRORS
  // ==========================================================

  if (!res.ok) {
    throw new ApiError(
      data?.message ||
        "Something went wrong",
      res.status,
      data
    );
  }

  // ==========================================================
  // SUCCESS
  // ==========================================================

  return data as T;
}

// ============================================================
// AUTH API
// ============================================================

export const authApi = {
  me: () =>
    apiFetch("/api/auth/me"),

  logout: () =>
    apiFetch("/api/auth/logout", {
      method: "POST",
    }),

  refreshToken: () =>
    apiFetch("/api/auth/refresh-token"),
};

// ============================================================
// POST TYPES
// ============================================================

export type CreatePostData = {
  title: string;
  html: string;
  excerpt?: string;
  attachments?: string[];
  status?: "draft" | "published";
};

export type UpdatePostData = {
  title?: string;
  html?: string;
  excerpt?: string;
  attachments?: string[];
  status?: "draft" | "published";
};

export interface CommentAuthor {
  _id: string;
  name: string;
  avatar: string | null;
}

export interface Comment {
  _id: string;
  post: string;
  author: CommentAuthor;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================================
// POSTS API
// ============================================================

export const postsApi = {
  // ----------------------------------------------------------
  // Create / publish post
  //
  // POST /api/posts
  // ----------------------------------------------------------

  create: (postData: CreatePostData) =>
    apiFetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(postData),
    }),

  // ----------------------------------------------------------
  // Get published posts
  //
  // GET /api/posts
  // ----------------------------------------------------------

  getFeed: () =>
    apiFetch("/api/posts"),

  // ----------------------------------------------------------
  // Get post by slug
  //
  // GET /api/posts/:slug
  // ----------------------------------------------------------

  getBySlug: (slug: string) =>
    apiFetch(
      `/api/posts/${encodeURIComponent(slug)}`
    ),

  // ----------------------------------------------------------
  // Get my posts
  //
  // GET /api/posts/me
  // ----------------------------------------------------------

  getMyPosts: () =>
    apiFetch("/api/posts/me"),

  // ----------------------------------------------------------
  // Update post
  //
  // PATCH /api/posts/:id
  // ----------------------------------------------------------

  update: (
    postId: string,
    postData: UpdatePostData
  ) =>
    apiFetch(
      `/api/posts/${postId}`,
      {
        method: "PATCH",
        body: JSON.stringify(postData),
      }
    ),

  // ----------------------------------------------------------
  // Delete post
  //
  // DELETE /api/posts/:id
  // ----------------------------------------------------------

  delete: (postId: string) =>
    apiFetch(
      `/api/posts/${postId}`,
      {
        method: "DELETE",
      }
    ),

  // ----------------------------------------------------------
  // Like post
  // ----------------------------------------------------------

  like: (postId: string) =>
    apiFetch<{
      success: boolean;
      likesCount: number;
    }>(
      `/api/posts/${postId}/like`,
      {
        method: "POST",
      }
    ),

  // ----------------------------------------------------------
  // Unlike post
  // ----------------------------------------------------------

  unlike: (postId: string) =>
    apiFetch<{
      success: boolean;
      likesCount: number;
    }>(
      `/api/posts/${postId}/like`,
      {
        method: "DELETE",
      }
    ),

  // ----------------------------------------------------------
  // Bookmark post
  // ----------------------------------------------------------

  bookmark: (postId: string) =>
    apiFetch<{
      success: boolean;
      bookmarksCount: number;
    }>(
      `/api/posts/${postId}/bookmark`,
      {
        method: "POST",
      }
    ),

  // ----------------------------------------------------------
  // Remove bookmark
  // ----------------------------------------------------------

  removeBookmark: (postId: string) =>
    apiFetch<{
      success: boolean;
      bookmarksCount: number;
    }>(
      `/api/posts/${postId}/bookmark`,
      {
        method: "DELETE",
      }
    ),

  // ----------------------------------------------------------
  // Reshare post
  // ----------------------------------------------------------

  reshare: (postId: string) =>
    apiFetch<{
      success: boolean;
      resharesCount: number;
    }>(
      `/api/posts/${postId}/reshare`,
      {
        method: "POST",
      }
    ),

  // ----------------------------------------------------------
  // Undo reshare
  // ----------------------------------------------------------

  unreshare: (postId: string) =>
    apiFetch<{
      success: boolean;
      resharesCount: number;
    }>(
      `/api/posts/${postId}/reshare`,
      {
        method: "DELETE",
      }
    ),

  // ----------------------------------------------------------
  // Get comments for a post
  // ----------------------------------------------------------

  getComments: (postId: string) =>
    apiFetch<{
      success: boolean;
      comments: Comment[];
    }>(
      `/api/posts/${postId}/comments`
    ),

  // ----------------------------------------------------------
  // Add a comment
  // ----------------------------------------------------------

  addComment: (
    postId: string,
    content: string
  ) =>
    apiFetch<{
      success: boolean;
      comment: Comment;
      commentsCount: number;
    }>(
      `/api/posts/${postId}/comments`,
      {
        method: "POST",
        body: JSON.stringify({
          content,
        }),
      }
    ),

  // ----------------------------------------------------------
  // Delete a comment
  //
  // Must be the comment's author.
  // ----------------------------------------------------------

  deleteComment: (commentId: string) =>
    apiFetch<{
      success: boolean;
      commentsCount: number;
    }>(
      `/api/posts/comments/${commentId}`,
      {
        method: "DELETE",
      }
    ),
};