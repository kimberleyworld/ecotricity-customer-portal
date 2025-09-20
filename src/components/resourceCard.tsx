import { useState } from "react";

export default function ResourceCard({ data }: { data: Array<{ id: string; name: string; format: string; url: string; description: string }> }) {
  const [downloaded, setDownloaded] = useState<{ [key: string]: boolean }>({});

  const handleDownload = async (resources: { id: string; name: string; url: string }) => {
    const response = await fetch(resources.url);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = resources.name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
    setDownloaded((prev) => ({ ...prev, [resources.id]: true }));
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Available Datasets</h1>
      <ul className="space-y-4">
        {data.map((resources) => (
          <li key={resources.id} className="p-4 border rounded-lg shadow">
            <h2 className="font-semibold">{resources.name}</h2>
            <p className="text-sm text-gray-600">{resources.format}</p>
            <p className="text-sm text-gray-600">{resources.description?.toString() || ""}</p>
            <button
              className={`inline-block mt-2 hover:underline ${downloaded[resources.id] ? "text-green-600" : "text-blue-600"}`}
              onClick={() => handleDownload(resources)}
            >
              Download
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}