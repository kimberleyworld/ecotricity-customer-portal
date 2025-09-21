"use client";

import { useState } from "react";
import Papa from "papaparse";
import ResourceModal from "./resourceModal";
import { Resource } from "../types/resource";
import Button from "./button";

export default function ResourceCard({ data }: { data: Resource[] }) {
  const [downloaded, setDownloaded] = useState<{ [key: string]: boolean }>({});
  const [viewedResource, setViewedResource] = useState<Resource | null>(null);
  const [csvRows, setCsvRows] = useState<string[][]>([]);

  const handleDownload = async (resource: Resource) => {
    try {
      const response = await fetch(resource.url);
      if (!response.ok) {
        // Optionally, show an error message to the user
        console.error(`Failed to download resource: ${response.status} ${response.statusText}`);
        return;
      }
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
    } catch (error) {
      // Optionally, show an error message to the user
      console.error("Error downloading resource:", error);
    }
  };

  const handleView = async (resource: Resource) => {
    setViewedResource(resource);

    if (resource.format.toLowerCase() === "csv") {
      // Fetch only the first 10,000 bytes for preview
      // may partially parse that last row,need to handle incomplete rows
      let response = await fetch(resource.url, {
        headers: { Range: "bytes=0-10000" }
      });
      let text;
      // If server does not support Range requests, fall back to full request
      if (response.status === 206) {
        text = await response.text();
      } else {
        // Try full request
        response = await fetch(resource.url);
        text = await response.text();
      }
      const parsed = Papa.parse<string[]>(text, { skipEmptyLines: true });
      setCsvRows(parsed.data);
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
            <p className="text-sm text-white">{resource.format}</p>
            <p className="text-sm text-white">
              {resource.description?.toString() || ""}
            </p>
            <div className="flex gap-2">
              <Button onClick={() => handleDownload(resource)}>
                Download
              </Button>
              <Button onClick={() => handleView(resource)}>
                View
              </Button>
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
