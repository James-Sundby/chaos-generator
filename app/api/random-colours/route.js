export async function GET() {
    const colors = Array(3).fill().map(() => {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        return `#${randomColor.padStart(6, '0')}`;
    });

    return new Response(JSON.stringify({ colors }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}