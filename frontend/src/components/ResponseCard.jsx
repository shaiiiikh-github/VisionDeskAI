function ResponseCard({ response }) {

    if (!response) return null;

    return (

        <div>

            <pre>

                {response}

            </pre>

        </div>

    );

}

export default ResponseCard;