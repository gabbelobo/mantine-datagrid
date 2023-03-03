import React from 'react'
import { UnstyledButton, Group, Center, Text } from '@mantine/core';
import { Selector, ChevronDown, ChevronUp } from 'tabler-icons-react';
import useStyles from '../Styles';

interface ThProps {
    children: React.ReactNode;
    reversed: boolean;
    sorted: boolean;
    onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
    const { classes } = useStyles();
    const Icon = sorted ? (reversed ? ChevronUp : ChevronDown) : Selector;
    return (
        <th className={classes.th}>
            <UnstyledButton onClick={onSort} className={classes.control}>
                <Group position="apart">
                    <Text weight={500} size="sm">
                        {children}
                    </Text>
                    <Center className={classes.icon}>
                        <Icon size={14} strokeWidth={1.5} />
                    </Center>
                </Group>
            </UnstyledButton>
        </th>
    );
}

export default Th