import { useEffect, useState } from "react";
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

    useEffect(() => {
        const controller = new AbortController();

        const fetchKpis = async () => {
            try {
                const response = await requestAPI("GET", "kpis/get-by-tenant-id", undefined, {
                    params: { tenant },
                    signal: controller.signal,
                });
                const data = response.data.data;
                setKpis({
                    usersCount: data.usersCount,
                    auditCount: data.auditCount,
                });
            } catch (err) {
                if ((err as any).name === "CanceledError") return;
                console.error(err);
            }
        };

        fetchKpis();

        return () => controller.abort();
    }, [tenant]);

    useEffect(() => {
        const handleKpiUpdate = (data: any) => {
            setKpis({
                usersCount: data.usersCount,
                auditCount: data.auditCount,
            });
        };

        socket.on("kpiUpdate", handleKpiUpdate);

        return () => {
            socket.off("kpiUpdate", handleKpiUpdate);
        };
    }, []);

    useEffect(() => {
        const getTenant = async () => {
            try {
                const response = await requestAPI("GET", `tenants/${tenant}`, undefined);
                const data = response.data.data;
                setName(data.subdomain);
            } catch (err) {
                console.error(err);
            }
        };

        getTenant();
    }, [tenant]);

    const handleUpdateTenant = async () => {
        try {
            await requestAPI("PATCH", `tenants/${tenant}`, { subdomain: name });
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
        </Box>
    );
};

export default Dashboard;