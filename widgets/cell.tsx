export function Cell(p: { 
    style?: React.CSSProperties; 
}) {
    return (
        <div
            style={{
                border: "1px solid transparent",
                borderRadius: "50%",
                padding: "8px",
                ...p.style, // Allow additional styles to be passed in
            }}
        ></div>
    );
}
