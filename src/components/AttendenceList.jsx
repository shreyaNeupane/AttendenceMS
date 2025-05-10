import { useEffect, useState } from "react";
import axios from "axios";

// Environment variables from Vite
const apiKey = import.meta.env.VITE_API_KEY;
const baseId = import.meta.env.VITE_BASE_ID;
const tableName = import.meta.env.VITE_TABLE_NAME;

const AttendanceList = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        });
        setRecords(res.data.records);
      } catch (error) {
        console.error("Error fetching data from Airtable:", error);
      }
    };

    fetchData(); // Run the fetch when component mounts
  }, []);

  return (
    <div>
      <h2>Attendance Records</h2>
      <ul>
        {records.map((record) => (
          <li key={record.id}>
            {record.fields.Name} - {record.fields.Date} - {record.fields.Status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttendanceList;
