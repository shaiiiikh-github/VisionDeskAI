import theme from "../styles/theme";

function Layout({ children }) {

    return (

        <div
            style={{

                width: 500,

                display: "flex",

                flexDirection: "column",

                gap: theme.spacing.md,

                padding: theme.spacing.lg

            }}
        >

            {children}

        </div>

    );

}

export default Layout;