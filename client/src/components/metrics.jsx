import React,{useEffect, useState} from 'react';
import "../styles/global.css";

const Metrics = () => {
    const [metrics, setMetrics] = useState({
        totalCustomers: 0,
        openLeads: 0,
        totalSales: 0,
        pendingTasks: 0,
    });

    useEffect(() =>{
        setMetrics({
            totalCustomers: 100,
            openLeads: 50,
            totalSales: 75,
            pendingTasks: 10
        });
    }, []);

    return(
        <div className="metrics-container">
            <div className='metric-card'>
                <h3>Total Customers</h3>
                <p>{metrics.totalCustomers}</p>
            </div>
            <div className='metric-card'>
                <h3>Open Leads</h3>
                <p>{metrics.openLeads}</p>
            </div>
            <div className='metric-card'>
                <h3>Total Sales</h3>
                <p>{metrics.totalSales}</p>
            </div>
            <div className='metric-card'>
                <h3>Pending Tasks</h3>
                <p>{metrics.pendingTasks}</p>
            </div>
        </div>
    )
};

export default Metrics;