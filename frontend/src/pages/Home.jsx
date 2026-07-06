import { useState, useEffect } from "react";

import API from "../services/api";

import Header from "../components/Header";
import LoadingSpinner from "../components/LoadingSpinner";
import ResponseCard from "../components/ResponseCard";

function Home() {

    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);

    const handleAnalyze = async (region) => {

        console.log("📦 Region received:", region);

        setLoading(true);

        try {

            console.log("🚀 Calling FastAPI...");

            const res = await API.post("/analyze", region);

            console.log("✅ Gemini Response:", res.data);

            setResponse(res.data.response);

        } catch (err) {

            console.error("❌ Analyze Error:", err);

            setResponse("Failed to analyze.");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        if (!window.electronAPI) {

            console.error("❌ electronAPI not found");

            return;

        }

        window.electronAPI.onRegionSelected((region) => {

            console.log("📨 React received region");

            handleAnalyze(region);

        });

    }, []);

    useEffect(() => {

        const handleKeyDown = (event) => {

            if (event.key === "Escape") {

                window.electronAPI.hideWindow();

            }

        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {

            window.removeEventListener("keydown", handleKeyDown);

        };

    }, []);

    return (

        <div
            style={{
                width: 380,
                minHeight: 240,
                maxHeight: 600,
                padding: 20,
                display: "flex",
                flexDirection: "column",
                gap: 16,
                overflowY: "auto"
            }}
        >

            <Header />

            {loading && <LoadingSpinner />}

            {!loading && response && (
                <ResponseCard response={response} />
            )}

        </div>

    );

}

export default Home;