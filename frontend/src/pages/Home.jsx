import { useState } from "react";

import API from "../services/api";

import Header from "../components/Header";
import AnalyzeButton from "../components/AnalyzeButton";
import LoadingSpinner from "../components/LoadingSpinner";
import ResponseCard from "../components/ResponseCard";

function Home() {

    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);

    const handleAnalyze = async () => {

        setLoading(true);

        try {

            const res = await API.get("/analyze");

            setResponse(res.data.response);

        } catch (err) {

            console.error(err);

            setResponse("Failed to analyze screen.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div>

            <Header />

            <AnalyzeButton
                onAnalyze={handleAnalyze}
                loading={loading}
            />

            {loading && <LoadingSpinner />}

            <ResponseCard response={response} />

        </div>

    );

}

export default Home;