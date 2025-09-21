"use client";

import { useState } from "react";
import Papa from "papaparse";
import ResourceModal from "./resourceModal";
import { Resource } from "../types/resource";
import Button from "./button";

export default function ResourceCard({ resource }: { resource: Resource }) {
  const [downloaded, setDownloaded] = useState(false);
  const [downloading, setDownloading] = useState(false); // new state
  const [viewedResource, setViewedResource] = useState<Resource | null>(null);
  const [csvRows, setCsvRows] = useState<string[][]>([]);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const response = await fetch(resource.url);
      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = resource.name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      setDownloaded(true);
    } catch (err) {
      console.error(err);
    } finally {
      setDownloading(false);
    }
  };

  const handleView = async () => {
    setViewedResource(resource);
    if (resource.format.toLowerCase() === "csv") {
      const response = await fetch(resource.url);
      const text = await response.text();
      const parsed = Papa.parse<string[]>(text, { skipEmptyLines: true });
      setCsvRows(parsed.data);
    } else {
      setCsvRows([]);
    }
  };

  return (
    <>
      <div className="p-4 border text-white flex flex-col justify-between max-w-[340px] sm:max-w-[300px] min-h-[250px]">
        <div>
          <h2 className="font-semibold mb-2">{resource.name}</h2>
          <p className="text-sm">{resource.description || ""}</p>
        </div>
        <div className="flex gap-2 mt-2">
          <Button
            onClick={handleDownload}
            disabled={downloaded || downloading}
            bgColor={downloaded ? "bg-gray-400" : undefined}
          >
            {downloading ? "Downloading..." : downloaded ? "Downloaded" : "Download"}
          </Button>
          <Button onClick={handleView}>View</Button>
        </div>
      </div>

      <ResourceModal
        resource={viewedResource}
        csvRows={csvRows}
        setResource={setViewedResource}
        setCsvRows={setCsvRows}
      />
    </>
  );
}
