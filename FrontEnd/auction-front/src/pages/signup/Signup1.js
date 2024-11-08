const Signup1 = () => {
    const embedPart = () => {
        return {
            __html: '<embed src="/test1.html" width="400px" height="600px" style="border: none;" />',
        };
    };

    return (
        <>
            <h1>회원가입</h1>
            <div 
                style={{ 
                    margin: 'auto', 
                    position: 'relative', 
                    width: '100%', 
                    maxWidth: '1200px', 
                    height: '400px', 
                    overflow: 'hidden'
                }} 
                dangerouslySetInnerHTML={embedPart()}
            />
        </>
    );
};

export default Signup1;
