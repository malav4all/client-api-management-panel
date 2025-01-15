import { useEffect, useState } from 'react';

interface MainContentProps {
  selectedEndpoint: any;
  setPayload: (payload: any) => void; // Callback to update payload in the parent
}

const MainContent = ({ selectedEndpoint, setPayload }: MainContentProps) => {
  const [payload, setLocalPayload] = useState<any>(
    selectedEndpoint?.payload || {}
  );

  // Update local payload whenever the selected endpoint changes
  useEffect(() => {
    setLocalPayload(selectedEndpoint?.payload || {});
  }, [selectedEndpoint]);

  // Handle changes in payload fields
  const handlePayloadChange = (key: string, value: string) => {
    const updatedPayload = { ...payload, [key]: value };
    setLocalPayload(updatedPayload);
    setPayload(updatedPayload); // Update parent state
  };

  return (
    <div className="h-screen w-full p-4">
      {/* Title and Description */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {selectedEndpoint?.name}
        </h1>
      </div>

      {/* Payload */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Payload</h2>
        <div className="rounded-md bg-gray-100 p-4 text-sm text-gray-800">
          {Object.keys(payload).length > 0 ? (
            Object.entries(payload).map(([key, value]) => (
              <div key={key} className="mb-4 flex items-center">
                <label className="mr-4 w-24 font-medium text-gray-700">
                  {key}:
                </label>
                <input
                  type="text"
                  value={value as any}
                  onChange={(e) => handlePayloadChange(key, e.target.value)}
                  className="w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))
          ) : (
            <p className="text-gray-600">
              No payload available for this endpoint.
            </p>
          )}
        </div>
      </section>

      {/* Responses */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Response Codes</h2>
        <div className="mt-2 space-y-4 rounded-lg border border-gray-300 p-4">
          {selectedEndpoint?.responseCodes &&
            selectedEndpoint?.responseCodes?.map(
              (response: any, index: any) => (
                <div key={index} className="flex items-center space-x-3">
                  <span
                    className={`h-4 w-4 rounded-full ${
                      response.code === 200
                        ? 'bg-green-500'
                        : response.code >= 400
                          ? 'bg-red-500'
                          : 'bg-gray-500'
                    }`}
                  ></span>
                  <p className="font-semibold text-gray-700">{response.code}</p>
                  <p className="text-sm text-gray-600">
                    {response.description}
                  </p>
                </div>
              )
            )}
        </div>
      </section>
    </div>
  );
};

export default MainContent;
