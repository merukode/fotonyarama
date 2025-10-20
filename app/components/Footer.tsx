import React from 'react'

function Footer() {
    return (
        <footer className="border-t-4 border-black px-6 md:px-12 py-16 md:py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <div className="border-b-2 border-black pb-8 mb-8">
                    <p className="font-serif text-2xl md:text-3xl font-black mb-4">FOTONYARAMA</p>
                    <p className="font-body text-sm text-gray-600 max-w-2xl">
                        Shooting whatever looks mildly interesting.
                    </p>
                </div>
                <p className="font-body text-xs text-gray-600 uppercase tracking-widest">
                    © 2025 Aulia Ramadhan | Fotonyarama. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer