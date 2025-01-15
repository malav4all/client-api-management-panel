import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaNode, FaGem, FaPython, FaPhp, FaJava, FaCopy } from 'react-icons/fa';

interface CurlSectionProps {
  selectedEndpoint: any; // Pass the selected endpoint from the parent component
  payload: any; // Pass the updated payload from the parent
}

const CurlSection: React.FC<CurlSectionProps> = ({
  selectedEndpoint,
  payload,
}) => {
  const apiKey = useSelector((state: any) => state.auth.user?.apiKey || '');
  const [authType, setAuthType] = useState('apikey');
  const [response, setResponse] = useState<string | null>(null);
  const [token, setToken] = useState(apiKey);
  const [selectedLanguage, setSelectedLanguage] = useState('Node');

  const mapAccessTypeToMethod = (accessType: string) => {
    switch (accessType) {
      case 'read':
        return 'GET';
      case 'write':
        return 'POST';
      case 'delete':
        return 'DELETE';
      default:
        return 'GET';
    }
  };

  const httpMethod = mapAccessTypeToMethod(selectedEndpoint?.accessType);

  const handleAuthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newAuthType = e.target.value;
    setAuthType(newAuthType);

    // Set the default token or key based on the selected auth type
    if (newAuthType === 'apikey') {
      setToken(apiKey);
    } else if (newAuthType === 'bearer') {
      setToken(''); // Clear the token for bearer auth
    }
  };

  const handleTryIt = async () => {
    try {
      const headers: any = {
        Accept: 'application/json',
      };

      if (authType === 'apikey') {
        headers['x-api-key'] = token;
      } else {
        headers['Authorization'] = `Bearer ${token}`;
      }
      let url = `http://localhost:3000/gateway/${selectedEndpoint.name}`;
      const options: any = {
        method: httpMethod,
        headers,
      };

      if (httpMethod === 'GET') {
        const queryParams = new URLSearchParams({
          page: payload.page,
          limit: payload.limit,
        });
        url = `${url}?${queryParams}`;
      }

      if (httpMethod !== 'GET' && payload) {
        options.body = JSON.stringify(payload);
        headers['Content-Type'] = 'application/json';
      }

      const res = await fetch(url, options);

      const result = await res.json();
      setResponse(JSON.stringify(result, null, 2));
    } catch (error: any) {
      setResponse(`Error: ${error.message}`);
    }
  };

  const curlExamples: { [key: string]: string } = {
    Node: `const axios = require('axios');

axios({
  method: '${httpMethod}',
  url: 'http://localhost:3000/gateway/${selectedEndpoint?.name}',
  headers: {
    Accept: 'application/json',
    ${
      authType === 'apikey'
        ? `'x-api-key': '${token}'`
        : `'Authorization': 'Bearer ${token}'`
    },
  },
  ${httpMethod !== 'GET' ? `data: ${JSON.stringify(payload, null, 2)},` : ''}
})
  .then(response => console.log(response.data))
  .catch(error => console.error(error));`,

    Ruby: `require 'net/http'
require 'uri'
require 'json'

uri = URI.parse("http://localhost:3000/gateway/${selectedEndpoint?.name}")
http = Net::HTTP.new(uri.host, uri.port)

request = Net::HTTP::${httpMethod}.new(uri.request_uri)
request["Accept"] = "application/json"
request["${authType === 'apikey' ? 'x-api-key' : 'Authorization'}"] = "${token}"
${
  httpMethod !== 'GET'
    ? `request.body = ${JSON.stringify(payload, null, 2)}`
    : ''
}

response = http.request(request)
puts response.body`,

    Python: `import requests

url = "http://localhost:3000/gateway/${selectedEndpoint?.name}"
headers = {
    "Accept": "application/json",
    "${authType === 'apikey' ? 'x-api-key' : 'Authorization'}": "${token}"
}
${httpMethod !== 'GET' ? `payload = ${JSON.stringify(payload, null, 2)}` : ''}

response = requests.${httpMethod.toLowerCase()}(url, headers=headers${
      httpMethod !== 'GET' ? ', json=payload' : ''
    })
print(response.json())`,

    PHP: `<?php

$url = "http://localhost:3000/gateway/${selectedEndpoint?.name}";
$headers = [
    "Accept: application/json",
    "${authType === 'apikey' ? 'x-api-key' : 'Authorization'}: ${token}"
];
${httpMethod !== 'GET' ? `$data = ${JSON.stringify(payload, null, 2)};` : ''}

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "${httpMethod}");
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
${
  httpMethod !== 'GET'
    ? 'curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));'
    : ''
}
$response = curl_exec($ch);
curl_close($ch);

print_r(json_decode($response, true));`,

    Java: `import java.net.HttpURLConnection;
import java.net.URL;
import java.io.OutputStream;
import java.util.Scanner;

public class Main {
  public static void main(String[] args) throws Exception {
    URL url = new URL("http://localhost:3000/gateway/${selectedEndpoint?.name}");
    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
    conn.setRequestMethod("${httpMethod}");
    conn.setRequestProperty("Accept", "application/json");
    conn.setRequestProperty("${
      authType === 'apikey' ? 'x-api-key' : 'Authorization'
    }", "${token}");
    ${
      httpMethod !== 'GET'
        ? `
    conn.setDoOutput(true);
    String payload = "${JSON.stringify(payload, null, 2)}";
    try (OutputStream os = conn.getOutputStream()) {
      os.write(payload.getBytes());
      os.flush();
    }`
        : ''
    }

    Scanner scanner = new Scanner(conn.getInputStream());
    while (scanner.hasNext()) {
      System.out.println(scanner.nextLine());
    }
    scanner.close();
  }
}`,
  };

  const icons: { [key: string]: JSX.Element } = {
    Node: <FaNode className="text-green-500" />,
    Ruby: <FaGem className="text-red-500" />,
    Python: <FaPython className="text-yellow-500" />,
    PHP: <FaPhp className="text-purple-500" />,
    Java: <FaJava className="text-orange-500" />,
  };

  const handleCopyCode = () => {
    const code = curlExamples[selectedLanguage];
    navigator.clipboard.writeText(code);
  };

  if (!selectedEndpoint) {
    return (
      <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-6">
        <p className="text-gray-600">
          Select an endpoint to view the cURL command.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-auto rounded-lg border border-gray-200 bg-gray-50 p-4 sm:p-6">
      {/* Language Tabs */}
      <div className="mb-4 flex flex-wrap items-center gap-2 sm:gap-4">
        {Object.keys(curlExamples).map((lang) => (
          <button
            key={lang}
            onClick={() => setSelectedLanguage(lang)}
            className={`flex items-center space-x-2 rounded px-4 py-2 transition-colors ${
              selectedLanguage === lang
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            {icons[lang]}
            <span>{lang}</span>
          </button>
        ))}
      </div>

      {/* Authentication Section */}
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Authentication
        </label>
        <select
          value={authType}
          onChange={handleAuthChange}
          className="w-full rounded-md border p-2"
        >
          <option value="apikey">API Key</option>
          <option value="bearer">Bearer</option>
        </select>
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder={authType === 'apikey' ? 'x-api-key' : 'Bearer token'}
          className="mt-2 w-full rounded-md border p-2 focus:ring focus:ring-blue-200"
        />
      </div>

      {/* CURL Request */}
      <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4 sm:p-6">
        <h3 className="mb-2 text-sm font-semibold text-gray-800">
          {selectedLanguage}
        </h3>
        <div className="relative mb-4 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-white">
          <pre className="whitespace-pre">{curlExamples[selectedLanguage]}</pre>
          <FaCopy
            className="absolute right-2 top-2 cursor-pointer text-white"
            onClick={handleCopyCode}
          />
        </div>

        <button
          onClick={handleTryIt}
          className="inline-block rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        >
          Try It!
        </button>
      </div>

      <div className="mt-4 w-full">
        <h3 className="mb-2 text-sm font-semibold text-gray-800">Response</h3>
        {/* Add min-h to provide a minimum height on smaller screens; increase at md+ if you like */}
        <div className="min-h-[200px] rounded-lg bg-gray-100 p-4 text-sm text-gray-800 md:min-h-[300px]">
          {response ? (
            <pre className="overflow-x-auto whitespace-pre-wrap break-words">
              {response}
            </pre>
          ) : (
            <p>Click "Try It!" to see the response here.</p>
          )}
        </div>
      </div>

      <div className="mt-4 w-full px-4 sm:px-6">
        {/* Title & Select Row */}
        <div className="mb-4 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
          <h3 className="text-sm font-semibold text-gray-800">Response</h3>
          <select className="w-full rounded-md border p-2 text-sm sm:w-auto">
            <option value="application/json">application/json</option>
          </select>
        </div>

        {/* Response Codes Container */}
        <div className="rounded-lg bg-gray-100 p-4 text-sm">
          <p className="mb-2 font-semibold text-gray-800">Response codes:</p>

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {selectedEndpoint.responseCodes.map((resp: any, index: number) => (
              <div
                key={index}
                className="flex items-center space-x-4 rounded-md bg-white p-4 shadow-sm"
              >
                <span
                  className={`h-5 w-5 rounded-full ${
                    resp.code === 200
                      ? 'bg-green-500'
                      : resp.code >= 400
                        ? 'bg-red-500'
                        : 'bg-gray-500'
                  }`}
                ></span>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {resp.code}
                  </p>
                  <p className="text-sm text-gray-600">{resp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurlSection;
