import * as React from 'react';
import { ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { GradientHeader } from './GradientHeader';

type ShowcaseLayoutProps = {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
};

export function ShowcaseLayout({ title, subtitle, children }: ShowcaseLayoutProps) {
    return (
        <>
            <Stack.Screen
                options={{
                    title,
                    headerStyle: { backgroundColor: 'transparent' },
                    headerTintColor: 'hsl(217, 92%, 60%)',
                    headerTitleStyle: { color: 'hsl(220, 15%, 95%)' },
                    headerShadowVisible: false,
                }}
            />
            <ScrollView
                className="flex-1 bg-background"
                contentContainerClassName="pb-8"
            >
                <GradientHeader title={title} subtitle={subtitle} />
                {children}
            </ScrollView>
        </>
    );
}
