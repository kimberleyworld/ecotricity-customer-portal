"use client";

import { useState } from "react";
import Papa from "papaparse";
import ResourceModal from "./resourceModal";
import { Resource } from "../types/resource";

export default function ResourceCard({ data }: { data: Resource[] }) {
  const [downloaded, setDownloaded] = useState<{ [key: string]: boolean }>({});
  const [viewedResource, setViewedResource] = useState<Resource | null>(null);
  const [csvRows, setCsvRows] = useState<string[][]>([]);

  const handleDownload = async (resource: Resource) => {
    const response = await fetch(resource.url);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = resource.name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);

    setDownloaded((prev) => ({ ...prev, [resource.id]: true }));
  };

  const handleView = async (resource: Resource) => {
    setViewedResource(resource);

    if (resource.format.toLowerCase() === "csv") {
      // Fetch only the first 10,000 bytes for preview
      // may partially parse that last row,need to handle incomplete rows
      const response = await fetch(resource.url, {
        headers: { Range: "bytes=0-10000" }
      });
      const text = await response.text();
      const parsed = Papa.parse<string[]>(text, { skipEmptyLines: true });
      setCsvRows(parsed.data);
    } else {
      setCsvRows([]); 
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Available Datasets</h1>
      <ul className="space-y-4">
        {data.map((resource) => (
          <li key={resource.id} className="p-4 border rounded-lg shadow">
            <h2 className="font-semibold">{resource.name}</h2>
            <p className="text-sm text-gray-600">{resource.format}</p>
            <p className="text-sm text-gray-600">
              {resource.description?.toString() || ""}
            </p>
            <div className="flex gap-2">
              <button
                className={`inline-block mt-2 hover:underline ${
                  downloaded[resource.id] ? "text-green-600" : "text-blue-600"
                }`}
                onClick={() => handleDownload(resource)}
              >
                Download
              </button>
              <button
                className="inline-block mt-2 text-purple-600 hover:underline"
                onClick={() => handleView(resource)}
              >
                View
              </button>
            </div>
          </li>
        ))}
      </ul>
      <ResourceModal
        resource={viewedResource}
        csvRows={csvRows}
        setResource={setViewedResource}
        setCsvRows={setCsvRows}
      />
    </>
  );
}
