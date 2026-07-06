function AnalyzeButton({ onAnalyze, loading }) {
    return (
        <button
            onClick={onAnalyze}
            disabled={loading}
            style={{
                padding: "12px 20px",
                borderRadius: 10,
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: 16,
                background: "#2f80ed",
                color: "white"
            }}
        >
            {loading ? "Analyzing..." : "Analyze Screen"}
        </button>
    );
}

export default AnalyzeButton;