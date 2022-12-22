import { Stack } from '@mui/material';
import React, { useState } from 'react';
import { twnButtonStyles } from '../../../utils/townoStyle';
import PropertyList from './PropertyList';
import AgentPropertyList from './AgentPropertyList';

const buttonStyles = {
    inActiveAgentBtn: { fontSize: "15px", background: "#111", cursor: "pointer", border: 0, borderTopLeftRadius: "4px", borderBottomLeftRadius: "4px", color: "white", textAlign: 'center', padding: '8px 6px' },
    activeAgentBtn: { fontSize: "15px", border: '2px solid #f46d25', fontWeight: "bold", background: "#f46d25", cursor: "pointer", borderRadius: "5px", color: "white", textAlign: 'center', padding: '6px 12px' },
    inActiveTownoBtn: { fontSize: "15px", border: 0, background: "#111", cursor: "pointer", borderTopRightRadius: "4px", borderBottomRightRadius: "4px", color: "white", padding: '8px 6px' },
    activeTownoBtn: { fontSize: "15px", fontWeight: "bold", background: "#f46d25", border: '2px solid #f46d25', cursor: "pointer", borderRadius: "5px", color: "white", textAlign: 'center', padding: '6px 12px' },
    createBtn: { fontSize: "15px", fontWeight: "bold", background: "#f46d25", border: 0, cursor: "pointer", borderRadius: "4px", color: "white", padding: '0.5em', textAlign: 'center' }
}

export default function Properties() {
    //this variable stores 2 values, agent and towno to display agent or towno properties respectively
    let [propertyType, setPropertyType] = useState("agent");

    return (
        <div style={{ ...twnButtonStyles.allPagesWithoutPadding, paddingTop: '6%' }}>
            {/* Floating button to select Agent or Towno Properties */}
            <div style={{float:"left", padding:'0 1%'}}>
                <Stack direction='row' justifyContent='flex-start' alignItems='flex-start' style={{ backgroundColor: '#111', borderRadius: '5px', height: '33px' }}>
                    <button
                        onClick={() => { setPropertyType('agent') }}
                        style={propertyType === "agent" ? buttonStyles.activeAgentBtn : buttonStyles.inActiveAgentBtn}>
                        Agent Properties
                    </button>
                    <button
                        onClick={() => { setPropertyType('towno') }}
                        style={propertyType === "towno" ? buttonStyles.activeTownoBtn : buttonStyles.inActiveTownoBtn}
                    >
                        Towno Properties
                    </button>
                </Stack>
            </div>
            {propertyType === "agent"?<AgentPropertyList/>:<PropertyList/>}
        </div>
    );
}