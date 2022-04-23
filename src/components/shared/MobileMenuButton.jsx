function MobileMenuButton({ mobileMenuStatus, setMobileMenuStatus }) {

 

    const assignLineStatus = () => mobileMenuStatus ? "line open" : "line"

    const buttonOnClick = () => {
        setMobileMenuStatus(!mobileMenuStatus)
        
    }

    return (
        <div className="mobile-button" onClick={buttonOnClick}>
            <div className={assignLineStatus()} id="top-line"></div>
            <div className={assignLineStatus()} id="middle-line"></div>
            <div className={assignLineStatus()} id="bottom-line"></div>
        </div>
    );
}

export default MobileMenuButton;
