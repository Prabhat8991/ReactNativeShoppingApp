import { Svg, Defs, LinearGradient, Stop, Path } from 'react-native-svg';

const Star = ({ fillPercentage }) => {
    // Ensure fillPercentage is within range [0, 100]
    const percentage = Math.min(Math.max(fillPercentage, 0), 100);

    // Calculate the width of the filled portion
    const filledWidth = (percentage / 100) * 36;

    return (
        <Svg width="15" height="15" viewBox="0 0 36 36">
            <Defs>
                <LinearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <Stop offset={`${percentage}%`} stopColor="gold" />
                    <Stop offset={`${percentage}%`} stopColor="white" />
                </LinearGradient>
            </Defs>
            <Path
                d="M18,1 L21.5,13 L34,13 L23,21.5 L27,34 L18,25 L9,34 L13,21.5 L2,13 L14.5,13 Z"
                fill="url(#goldGradient)"
                stroke="gold"
                strokeWidth="1"
            />
        </Svg>
    );
};

export default Star;



