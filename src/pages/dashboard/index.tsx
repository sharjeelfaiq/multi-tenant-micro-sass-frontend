import { useEffect, useState, useCallback } from "react";
import { Box, Button, TextField, Typography, Grid, Divider } from "@mui/material";
import { KPICard } from "../../components";
import { requestAPI, socket } from "../../utils";

export const Dashboard = () => {
    const user = localStorage.getItem("user");
    const parsedUser = user && JSON.parse(user);
    const tenant = parsedUser?.tenant;

    const [name, setName] = useState("");
    const [kpis, setKpis] = useState({
        usersCount: 0,
        auditCount: 0,
    });
    const [testData, setTestData] = useState(null);

    // Stable fetchKpis using useCallback
    const fetchKpis = useCallback(async () => {
        try {
            const response = await requestAPI(
                "GET",
                "kpis/get-by-tenant-id",
                undefined,
                { params: { tenant } }
            );
            const data = response.data.data;
            setKpis({
                usersCount: data.usersCount,
                auditCount: data.auditCount,
            });
        } catch (err) {
            console.error(err);
        }
    }, [tenant]);

    // Fetch tenant name
    const fetchTenantName = useCallback(async () => {
        try {
            const response = await requestAPI("GET", `tenants/${tenant}`, undefined);
            const data = response.data.data;
            setName(data.subdomain);
        } catch (err) {
            console.error(err);
        }
    }, [tenant]);

    // Initial fetch on mount
    useEffect(() => {
        fetchKpis();
        fetchTenantName();
    }, [fetchKpis, fetchTenantName]);

    // Socket updates (only run once)
    useEffect(() => {
        const handleKpiUpdate = () => {
            fetchKpis();
        };

        socket.on("user_count_updated", handleKpiUpdate);
        socket.on("audit_count_updated", handleKpiUpdate);

        return () => {
            socket.off("user_count_updated", handleKpiUpdate);
            socket.off("audit_count_updated", handleKpiUpdate);
        };
    }, [fetchKpis]);

    // Refresh KPIs after testData changes
    useEffect(() => {
        if (testData) {
            console.log("Test API returned:", testData);
            fetchKpis();
        }
    }, [testData, fetchKpis]);

    const handleUpdateTenant = async () => {
        try {
            await requestAPI("PATCH", `tenants/${tenant}`, { subdomain: name });
            await fetchKpis();      // refresh KPIs after tenant update
            await fetchTenantName(); // refresh tenant name
        } catch (err) {
            console.error(err);
        }
    };

    const handleTestUltravox = async () => {
        try {
            const response = await requestAPI("GET", "ultravox/test", undefined, {
                params: { tenant },
            });
            setTestData(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
            {/* Header */}
            <Typography variant="h5" fontWeight={600} color="text.primary" mb={3}>
                Dashboard
            </Typography>

            {/* KPI Cards */}
            <Grid container spacing={2} mb={4}>
                <Grid item xs={12} sm={6} md={4}>
                    <KPICard title="Users" count={kpis?.usersCount} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <KPICard title="Audits" count={kpis?.auditCount} />
                </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            {/* Tenant Settings */}
            <Box>
                <Typography variant="h6" fontWeight={600} color="text.primary" mb={2}>
                    Tenant Settings
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', maxWidth: 500 }}>
                    <TextField
                        label="Tenant Name"
                        variant="outlined"
                        size="small"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                    />
                    <Button
                        variant="contained"
                        onClick={handleUpdateTenant}
                        sx={{ minWidth: 100 }}
                    >
                        Update
                    </Button>
                </Box>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Test Ultravox */}
            <Box>
                <Typography variant="h6" fontWeight={600} color="text.primary" mb={2}>
                    Test Ultravox
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', maxWidth: 500 }}>
                    <Button
                        variant="outlined"
                        onClick={handleTestUltravox}
                        sx={{ minWidth: 100 }}
                    >
                        Test
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;
