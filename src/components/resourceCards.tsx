"use client";

import { useEffect, useState } from "react";
import ResourceCard from "./resourceCard";
import { Resource } from "../types/resource";

export default function ResourceCards() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await fetch("/api/resources");
        const data = await res.json();
        if (data.error) {
          setError(data.error);
        } else {
          setResources(data);
        }
      } catch {
        setError("Something went wrong");
      }
    };
    fetchResources();
  }, []);

  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Available Datasets</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>

  );
}