function ResponseCard({ response }) {

    if (!response) return null;

    return (
        <div>
            <div
                style={{
                    background: "#1b1b1b",
                    padding: 20,
                    borderRadius: 12,
                    whiteSpace: "pre-wrap",
                    overflowWrap: "break-word"
                }}
            >
                {response.split("\n").map((line, index) => (

                    <p
                        key={index}
                        style={{
                            marginBottom: 10
                        }}
                    >
                        {line}
                    </p>

                ))}
            </div>
        </div>
    );
}

export default ResponseCard;