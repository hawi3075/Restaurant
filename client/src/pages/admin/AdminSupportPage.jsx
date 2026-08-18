import React from 'react';
import { MessageSquare } from 'lucide-react';

export default function AdminSupportPage() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Contact Messages & Support</h1>
        <p className="text-xs text-gray-500 mt-0.5">Review inquiries and support messages sent by users.</p>
      </div>
    </div>
  );
}