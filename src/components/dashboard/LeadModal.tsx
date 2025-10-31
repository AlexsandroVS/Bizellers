import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Mail,
  Phone,
  Building2,
  Briefcase,
  MessageSquare,
  Calendar,
  StickyNote,
  Trash2,
  Send,
} from 'lucide-react';
import { generateWhatsAppLink, generateGmailLink, validateLatamPhone, getCountryInfo } from '@/utils/phoneValidation';
import type { Lead } from '@/types/dashboard';

interface LeadModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onNotesUpdate: (notes: string) => Promise<boolean>;
  onDelete: () => Promise<boolean>;
}

export function LeadModal({ lead, isOpen, onClose, onNotesUpdate, onDelete }: LeadModalProps) {
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (lead) {
      setNotes(lead.notes || '');
    }
  }, [lead]);

  if (!lead) return null;

  const phoneValidation = validateLatamPhone(lead.telefono);
  const countryInfo = getCountryInfo(lead.telefono);

  const handleSaveNotes = async () => {
    setIsSaving(true);
    const success = await onNotesUpdate(notes);
    setIsSaving(false);
    if (success) {
      // Mostrar feedback de éxito
    }
  };

  const handleDelete = async () => {
    const success = await onDelete();
    if (success) {
      setShowDeleteConfirm(false);
      onClose();
    }
  };

  const handleWhatsApp = () => {
    const message = `Hola ${lead.nombre}, te contacto desde Bizellers respecto a tu consulta sobre ${lead.servicio}.`;
    const link = generateWhatsAppLink(lead.telefono, message);
    window.open(link, '_blank');
  };

  const handleGmail = () => {
    const subject = `Bizellers - ${lead.servicio}`;
    const body = `Hola ${lead.nombre},\n\nGracias por tu interés en ${lead.servicio}.\n\n`;
    const link = generateGmailLink(lead.correo, subject, body);
    window.location.href = link;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-negro/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#1a1a1a] border-2 border-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col pointer-events-auto"
            >
              {/* Header */}
              <div className="border-b-2 border-gray-800 p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-blanco">{lead.nombre}</h2>
                  <p className="text-gray-400 mt-1">{lead.empresa}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Cargo */}
                  <div className="flex items-start gap-3">
                    <Briefcase className="w-5 h-5 text-verde-lima mt-1" />
                    <div>
                      <div className="text-sm text-gray-400">Cargo</div>
                      <div className="text-blanco font-medium">{lead.cargo}</div>
                    </div>
                  </div>

                  {/* Empresa */}
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-verde-lima mt-1" />
                    <div>
                      <div className="text-sm text-gray-400">Empresa</div>
                      <div className="text-blanco font-medium">{lead.empresa}</div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-verde-lima mt-1" />
                    <div className="flex-1">
                      <div className="text-sm text-gray-400">Correo</div>
                      <a
                        href={`mailto:${lead.correo}`}
                        className="text-blanco font-medium hover:text-verde-lima transition-colors break-all"
                      >
                        {lead.correo}
                      </a>
                    </div>
                  </div>

                  {/* Teléfono */}
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-verde-lima mt-1" />
                    <div>
                      <div className="text-sm text-gray-400">Teléfono</div>
                      <div className="text-blanco font-medium">{lead.telefono}</div>
                      {countryInfo && (
                        <div className="text-xs text-gray-500 mt-1">{countryInfo.name}</div>
                      )}
                    </div>
                  </div>

                  {/* Servicio */}
                  <div className="flex items-start gap-3 md:col-span-2">
                    <MessageSquare className="w-5 h-5 text-verde-lima mt-1" />
                    <div>
                      <div className="text-sm text-gray-400">Servicio Solicitado</div>
                      <div className="text-blanco font-medium">{lead.servicio}</div>
                    </div>
                  </div>

                  {/* Fecha de creación */}
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-verde-lima mt-1" />
                    <div>
                      <div className="text-sm text-gray-400">Fecha de Creación</div>
                      <div className="text-blanco font-medium">
                        {new Date(lead.created_at).toLocaleString('es-PE', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mensaje */}
                {lead.mensaje && (
                  <div>
                    <div className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Mensaje
                    </div>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-gray-300">
                      {lead.mensaje}
                    </div>
                  </div>
                )}

                {/* Notas internas */}
                <div>
                  <div className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                    <StickyNote className="w-4 h-4" />
                    Notas Internas
                  </div>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Agrega notas sobre este lead..."
                    className="w-full h-32 bg-gray-800/50 border-2 border-gray-700 rounded-lg p-4 text-negro placeholder-gray-500 focus:outline-none focus:border-verde-lima transition-colors resize-none"
                  />
                  {notes !== (lead.notes || '') && (
                    <motion.button
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={handleSaveNotes}
                      disabled={isSaving}
                      className="mt-2 px-4 py-2 bg-verde-lima text-negro rounded-lg font-semibold hover:bg-verde-lima-dark transition-colors disabled:opacity-50"
                    >
                      {isSaving ? 'Guardando...' : 'Guardar Notas'}
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Footer - Actions */}
              <div className="border-t-2 border-gray-800 p-6 flex flex-wrap gap-3">
                {/* WhatsApp */}
                {phoneValidation.isValid && (
                  <motion.button
                    onClick={handleWhatsApp}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-blanco rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send className="w-5 h-5" />
                    WhatsApp
                  </motion.button>
                )}

                {/* Gmail */}
                <motion.button
                  onClick={handleGmail}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-blanco rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail className="w-5 h-5" />
                  Gmail
                </motion.button>

                {/* Delete */}
                {!showDeleteConfirm ? (
                  <motion.button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600/20 text-red-400 border border-red-600/50 rounded-lg font-semibold hover:bg-red-600/30 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Trash2 className="w-5 h-5" />
                    Eliminar
                  </motion.button>
                ) : (
                  <div className="flex gap-2">
                    <motion.button
                      onClick={handleDelete}
                      className="px-4 py-3 bg-red-600 text-blanco rounded-lg font-semibold hover:bg-red-700 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Confirmar
                    </motion.button>
                    <motion.button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="px-4 py-3 bg-gray-700 text-blanco rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Cancelar
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
