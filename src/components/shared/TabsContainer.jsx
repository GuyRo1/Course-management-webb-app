import { useState, useEffect } from 'react';

const TabsContainer = ({ options, initialTab, components }) => {

    const turnActive = index => {
        if (index >= 0 && index < components.length) {
            setCurrentTab(index)
            setActiveComponent(components[initialTab].Component)
        }
    }

    const [currentTab, setCurrentTab] = useState(initialTab)



    const [ActiveComponent, setActiveComponent] = useState(components[initialTab].Component)

    const assignClassForTabs = (index, currentTab) =>{
        let tabClassName = "tab"
        if(index===0) tabClassName+=" left"
        if(index===components.length-1) tabClassName+=" right"
        if(index===currentTab) tabClassName+=" active"
        return tabClassName
    }

    return (
        <div className={options.containerClass + " tabs-container"}>
            <div className={options.headerClass + " tabs-header"}>
                {components.map((component, index) => (
                    <div
                        key={component.key}
                        className={assignClassForTabs(index, currentTab)}
                        onClick={event => {
                            event.preventDefault()
                            turnActive(index)
                        }}>
                        {component.text}
                    </div>
                ))}
            </div>
            <div className="active-tab-content">
                {ActiveComponent}
               {/* <ActiveComponent/> */}
            </div>
        </div>
    )
}

export default TabsContainer;