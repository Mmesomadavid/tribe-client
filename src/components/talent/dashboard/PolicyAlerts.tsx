import {
  AlertCircle,
  ChevronRight,
  X,
} from "lucide-react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../components/ui/alert";

const PolicyAlerts = () => {
  return (
    <Alert className="flex items-center gap-3 rounded-xl border-orange-200 bg-orange-50 px-3 py-2.5 text-orange-900">
      <AlertCircle className="h-4 w-4 shrink-0 text-orange-500" />

      <div className="flex min-w-0 flex-1 items-center gap-2">
        <AlertTitle className="shrink-0 text-sm font-semibold text-orange-900">
          Tax information required
        </AlertTitle>

        <AlertDescription className="hidden truncate text-xs text-orange-700 sm:block">
          Update your tax information to keep your account in good standing.
        </AlertDescription>
      </div>

      <button
        type="button"
        className="flex shrink-0 items-center gap-1 text-xs font-semibold text-orange-800 transition-colors hover:text-orange-950"
      >
        Update
        <ChevronRight className="h-3.5 w-3.5" />
      </button>

      <button
        type="button"
        aria-label="Dismiss alert"
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-orange-500 transition-colors hover:bg-orange-100 hover:text-orange-800"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </Alert>
  );
};

export default PolicyAlerts;