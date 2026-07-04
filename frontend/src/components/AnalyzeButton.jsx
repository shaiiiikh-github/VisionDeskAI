function AnalyzeButton({ onAnalyze, loading }) {

    return (

        <button
            onClick={onAnalyze}
            disabled={loading}
        >

            {loading ? "Analyzing..." : "Analyze Screen"}

        </button>

    );

}

export default AnalyzeButton;