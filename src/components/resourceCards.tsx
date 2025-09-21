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
    <div className="max-w-3xl mx-auto p-6">
      <ResourceCard data={resources} />
    </div>
  );
}