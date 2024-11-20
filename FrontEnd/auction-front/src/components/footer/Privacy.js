const Privacy = () => 
    {
        return (
            <div className="privacy-policy">
                <iframe 
                    src="/privacy_policy.html" 
                    title="개인정보취급방침"
                    aria-label="개인정보취급방침" 
                    width="100%"
                    height="930px"
                    style={{ border: "none" }}
                />
            </div>
        );
    };
    
    export default Privacy;
    