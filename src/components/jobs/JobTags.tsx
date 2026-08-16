interface JobTagsProps {
  skills: string[];
}

export default function JobTags({
  skills,
}: JobTagsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span
          key={skill}
          className="rounded-md bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-600"
        >
          {skill}
        </span>
      ))}
    </div>
  );
}