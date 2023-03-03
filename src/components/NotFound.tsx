import React from 'react'
import { Text } from '@mantine/core'

interface INotFoundProps {
    colCount: number
}

const NotFound = ({colCount} : INotFoundProps) => {
    return (
        <tr>
            <td colSpan={colCount}>
                <Text weight={500} align="center">
                    Nada encontrado
                </Text>
            </td>
        </tr>
    )
}

export default NotFound