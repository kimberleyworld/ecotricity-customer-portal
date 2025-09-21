import { Dispatch, SetStateAction } from "react";
import { Resource } from "../types/resource";

type ResourceModalProps = {
  resource: Resource | null;
  csvRows: string[][];
  setResource: Dispatch<SetStateAction<Resource | null>>;
  setCsvRows: Dispatch<SetStateAction<string[][]>>;
};

export default function ResourceModal({
  resource,
  csvRows,
  setResource,
  setCsvRows,
}: ResourceModalProps) {
  if (!resource) return null; 

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-[80vh] overflow-auto">
        <h2 className="text-xl font-bold mb-2 text-black">{resource.name}</h2>

        {csvRows.length > 0 ? (
          <div className="overflow-auto border rounded max-h-96">
            <table className="text-xs w-full border-collapse text-black">
              <thead className="bg-white sticky top-0">
                <tr>
                  {csvRows[0].map((cell, i) => (
                    <th key={i} className="p-2 border text-left text-black bg-gray-200">
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {csvRows.slice(1, 30).map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} className="p-2 border text-black">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-black">
            {resource.format.toLowerCase() === "csv"
              ? "Loading data..."
              : "Preview not available for this format."}
          </p>
        )}
        <button
              className="mt-2 mr-3 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              onClick={() => {}}
            >
              Load More
            </button>
        <button
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          onClick={() => {
            setResource(null);
            setCsvRows([]);
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
