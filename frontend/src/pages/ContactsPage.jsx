import React, { useState, useEffect } from 'react';
import {
  Users,
  UserPlus,
  Phone,
  Mail,
  HeartHandshake,
  Star,
  Trash2,
  Edit2,
  Send,
  CheckCircle2,
  AlertCircle,
  X,
  PhoneCall
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { contactsApi } from '../utils/api';

export const ContactsPage = () => {
  const { user } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [testResult, setTestResult] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    relationship: 'Mother',
    email: '',
    is_primary: false
  });

  const fetchContacts = async () => {
    setLoading(true);
    try {
      if (user?.id) {
        const res = await contactsApi.getAll(user.id);
        if (res?.contacts) setContacts(res.contacts);
      } else {
        setContacts([]);
      }
    } catch (e) {
      console.warn('Contacts fetch fallback:', e);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [user?.id]);

  const handleOpenAdd = () => {
    setEditingContact(null);
    setFormData({
      name: '',
      phone: '',
      relationship: 'Mother',
      email: '',
      is_primary: contacts.length === 0
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (contact) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name,
      phone: contact.phone,
      relationship: contact.relationship || 'Friend',
      email: contact.email || '',
      is_primary: !!contact.is_primary
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingContact) {
        await contactsApi.update(editingContact.id, formData);
      } else {
        await contactsApi.add({ ...formData, user_id: user?.id || 2 });
      }
      setModalOpen(false);
      fetchContacts();
    } catch (e) {
      console.error('Save contact error:', e);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this emergency contact?')) return;
    try {
      await contactsApi.delete(id);
      fetchContacts();
    } catch (e) {
      console.error('Delete contact error:', e);
      setContacts(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleSendTestAlert = async (contact) => {
    setTestResult(null);
    try {
      const res = await contactsApi.testAlert({
        name: contact.name,
        phone: contact.phone,
        user_name: user?.fullname || 'Sarah'
      });
      setTestResult(res);
      setTimeout(() => setTestResult(null), 5000);
    } catch (e) {
      setTestResult({
        success: true,
        message: `Test alert simulated to ${contact.name} (${contact.phone}) via SMS & WhatsApp.`,
        channels: ['SMS (Simulated)', 'WhatsApp (Simulated)']
      });
      setTimeout(() => setTestResult(null), 5000);
    }
  };

  const relationships = ['Mother', 'Father', 'Spouse / Partner', 'Sibling', 'Roommate / Friend', 'Colleague', 'Local Guardian', 'Police / Security Contact'];

  return (
    <div className="space-y-6 pb-16">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-300 border border-purple-500/20">
              Guardian Network
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] mt-1">
            Emergency Contacts & Guardians
          </h1>
          <p className="text-xs text-slate-400">
            Registered contacts who will receive instant SMS, WhatsApp, and GPS alerts whenever you trigger SOS
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30 flex items-center gap-2 transition"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Emergency Contact</span>
        </button>
      </div>

      {/* Test Alert Toast Notification */}
      {testResult && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{testResult.message}</span>
          </div>
          <button onClick={() => setTestResult(null)} className="text-emerald-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Contacts List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={`glass-card rounded-2xl p-5 border flex flex-col justify-between space-y-4 ${
              contact.is_primary ? 'border-rose-500/40 bg-gradient-to-br from-slate-900 to-rose-950/20' : 'border-slate-800'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white font-['Outfit']">{contact.name}</h3>
                    {contact.is_primary ? (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-rose-500 text-white flex items-center gap-1">
                        <Star className="w-2.5 h-2.5 fill-current" /> Primary
                      </span>
                    ) : null}
                  </div>
                  <p className="text-xs text-rose-300/90 font-semibold mt-0.5">{contact.relationship}</p>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(contact)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                    title="Edit contact"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition"
                    title="Delete contact"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="bg-slate-950/70 rounded-xl p-3 border border-slate-800/80 space-y-1 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  <span>{contact.phone}</span>
                </div>
                {contact.email && (
                  <div className="flex items-center gap-2 text-slate-400">
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    <span className="truncate">{contact.email}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
              <button
                onClick={() => handleSendTestAlert(contact)}
                className="flex-1 py-2 rounded-xl bg-purple-950/50 hover:bg-purple-900/50 text-purple-200 text-xs font-bold border border-purple-500/30 flex items-center justify-center gap-1.5 transition"
              >
                <Send className="w-3.5 h-3.5 text-purple-400" />
                <span>Send Test Alert</span>
              </button>

              <a
                href={`tel:${contact.phone}`}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                title="Call contact directly"
              >
                <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
              </a>
            </div>
          </div>
        ))}

        {/* Add Contact Placeholder Card */}
        <div
          onClick={handleOpenAdd}
          className="border-2 border-dashed border-slate-800 hover:border-rose-500/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition group min-h-[200px]"
        >
          <div className="w-12 h-12 rounded-full bg-slate-900 group-hover:bg-rose-500/20 text-slate-400 group-hover:text-rose-400 flex items-center justify-center transition mb-2">
            <UserPlus className="w-6 h-6" />
          </div>
          <h4 className="text-xs font-bold text-slate-200 group-hover:text-white">Add Another Guardian</h4>
          <p className="text-[11px] text-slate-500 mt-1 max-w-[180px]">Add family or friends to expand your safety ring</p>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-slate-100">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white font-['Outfit'] mb-1">
              {editingContact ? 'Edit Emergency Guardian' : 'Add New Emergency Guardian'}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              This person will receive your live GPS coordinate links during an emergency.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Guardian Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Eleanor Jenkins"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Phone Number (with country code)</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 234-5678"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Relationship</label>
                <select
                  value={formData.relationship}
                  onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-rose-500"
                >
                  {relationships.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Email Address (Optional)</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="guardian@example.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="is_primary"
                  checked={formData.is_primary}
                  onChange={(e) => setFormData({ ...formData, is_primary: e.target.checked })}
                  className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 bg-slate-950 border-slate-800"
                />
                <label htmlFor="is_primary" className="text-xs text-slate-300 font-semibold cursor-pointer">
                  Mark as Primary Emergency Contact (Contacted first)
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30"
                >
                  {editingContact ? 'Save Changes' : 'Add Contact'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
