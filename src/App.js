import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

const App = () => {
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        fetch('http://localhost:5000/api/data')
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const filteredData = data.filter((item) => {
        const itemDate = new Date(item.arrival_date_year, new Date(item.arrival_date_month).getMonth(), item.arrival_date_day_of_month);
        return itemDate >= startDate && itemDate <= endDate;
    });

    return (
        <div className="container-fluid">
            <div className="row mt-4">
                <div className="col-md-6">
                    <div className="mb-4">
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                    </div>
                    <div className="card">
                        <Chart
                            options={{
                                chart: {
                                    id: "line-chart",
                                    toolbar: {
                                        show: false
                                    }
                                },
                                xaxis: {
                                    categories: data.map((item) => `${item.arrival_date_month}-${item.arrival_date_day_of_month}`)
                                },
                                stroke: {
                                    curve: 'smooth'
                                },
                                markers: {
                                    size: 6
                                },
                                title: {
                                    text: 'Number of Visitors per Day',
                                    align: 'center'
                                }
                            }}
                            series={[
                                {
                                    name: "Number of Visitors",
                                    data: data.map((item) => item.adults + item.children + item.babies)
                                }
                            ]}
                            type="line"
                            width={500}
                            height={300}
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <Chart
                            options={{
                                chart: {
                                    id: "column-chart",
                                    toolbar: {
                                        show: false
                                    }
                                },
                                xaxis: {
                                    categories: data.map((item) => item.country),
                                    labels: {
                                        rotate: -45
                                    }
                                },
                                plotOptions: {
                                    bar: {
                                        horizontal: false
                                    }
                                },
                                dataLabels: {
                                    enabled: false
                                },
                                title: {
                                    text: 'Number of Visitors per Country',
                                    align: 'center'
                                }
                            }}
                            series={[
                                {
                                    name: "Number of Visitors",
                                    data: data.map((item) => item.adults + item.children + item.babies)
                                }
                            ]}
                            type="bar"
                            width={500}
                            height={300}
                        />

                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-6">
                    <div className="card">
                        <h5 className="card-title text-center">Total Number of Adult Visitors</h5>
                        <Chart
                            options={{
                                chart: {
                                    id: "sparkline-1",
                                    sparkline: {
                                        enabled: true
                                    }
                                },
                                dataLabels: {
                                    enabled: false
                                },
                                stroke: {
                                    curve: 'smooth',
                                    width: 2
                                },
                                markers: {
                                    size: 0
                                }
                            }}
                            series={[
                                {
                                    name: "Total Adults",
                                    data: data.map((item) => item.adults)
                                }
                            ]}
                            type="line"
                            width={200}
                            height={100}
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <h5 className="card-title text-center">Total Number of Children Visitors</h5>
                        <Chart
                            options={{
                                chart: {
                                    id: "sparkline-2",
                                    sparkline: {
                                        enabled: true
                                    }
                                },
                                dataLabels: {
                                    enabled: false
                                },
                                stroke: {
                                    curve: 'smooth',
                                    width: 2
                                },
                                markers: {
                                    size: 0
                                }
                            }}
                            series={[
                                {
                                    name: "Total Children",
                                    data: data.map((item) => item.children)
                                }
                            ]}
                            type="line"
                            width={200}
                            height={100}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
