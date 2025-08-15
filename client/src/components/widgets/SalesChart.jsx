import React, {useEffect, useState} from "react";
import axios from "axios";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from "recharts";

const SalesChart = () =>{
    const [salesData, setSalesData] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:5000/api/sales/sales")
        .then((res)=>setSalesData(res.data))
    }, []);

    return (
        <div>
            <h3>Monthly sales</h3>
            <LineChart width={600} height={300} data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </div>
    );
}

export default SalesChart;