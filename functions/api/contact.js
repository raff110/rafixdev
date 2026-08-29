export async function onRequestPost(context) {
    try {
        // Mengambil data yang dikirim dari frontend (fetch API)
        const data = await context.request.json();
        
        // Di sini kamu bisa menambahkan logika untuk mengirim ke Telegram/Email
        console.log("Pesan Diterima:", data);

        // Mengembalikan response ke frontend
        return new Response(JSON.stringify({ 
            success: true, 
            message: 'Pesan berhasil dikirim! Rafif akan segera membalas.' 
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: 'Terjadi kesalahan' }), { 
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}