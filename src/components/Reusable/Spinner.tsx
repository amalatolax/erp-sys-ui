const Spinner = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
            <div className="relative flex items-center justify-center">
                {/* Base letter */}
                <span className="text-7xl font-bold text-green-700 opacity-30 select-none">
                    O
                </span>

                {/* Gradient spinner ring */}
                <span
                    className="absolute text-7xl font-bold animate-spin select-none"
                    style={{
                        background:
                            'conic-gradient(#4ade80 0deg, #15803d 120deg, transparent 300deg)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    O
                </span>
            </div>
        </div>
    );
};

export default Spinner