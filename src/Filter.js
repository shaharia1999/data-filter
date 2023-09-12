import React, { useEffect, useState } from 'react';

const Filter = () => {
    const [originalData, setOriginalData] = useState([]);
    const [selectedUserIds, setSelectedUserIds] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);
 
    const fetchData = async () => {
        try {
            const res = await fetch("https://jsonplaceholder.typicode.com/posts");
            const data = await res.json();
            setOriginalData(data);
            setFilteredData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleCheckboxChange = (e, userId) => {
        console.log(selectedUserIds);
        console.log(userId);
        const { checked } = e.target;
        if (checked) {
            // Add the selected userId to the array   ??
            setSelectedUserIds((prevIds) => [...prevIds, userId]);
        } else {
            // Remove the deselected userId from the array
            setSelectedUserIds((prevIds) => prevIds.filter((id) => id !== userId));
        }
    };

    useEffect(() => {
        // Filter the data based on selectedUserIds
        if (selectedUserIds.length > 0) {
            const filterData = originalData.filter((item) => selectedUserIds.includes(item.userId));
            setFilteredData(filterData);
        } else {
            // If no checkboxes are selected, show all data
            setFilteredData(originalData);
        }
    }, [selectedUserIds, originalData]);

    return (
        <div>
            <h2>Filter data</h2>
            {Array.from({ length: 10 }, (_, i) => (
                <div key={i}>
                    <label>Userid{i + 1}</label>
                    <input
                        type="checkbox"
                        value={i + 1}
                        name="filter"
                        onChange={(e) => handleCheckboxChange(e, i + 1)}
                    />
                </div>
            ))}

            {filteredData.map((item) => (
                <div key={item.id}>
                    <div>{item.userId} ---- {item.title}</div>
                    <hr />
                    <div>{item.body}</div>
                </div>
            ))}
            <hr />
        </div>
    );
};

export default Filter;