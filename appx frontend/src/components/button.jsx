import React from 'react'
import { Button } from '@mui/material'
export default function CustomizedButton({buttonName,type,className,onClick,disabled,icon,sx,variant,color,innerIcon,endIcon}) {
    return (
        <Button type={type} className={className} onClick={onClick} disabled={disabled} sx={sx} variant={variant} startIcon={icon} color={color} endIcon={endIcon}>
            {buttonName} {innerIcon} 
        </Button>
    )}
