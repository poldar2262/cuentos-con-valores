import React, { useState } from 'react';
import {
  X,
  Lock,
  Unlock,
  KeyRound,
  PlusCircle,
  FolderOpen,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  BookOpen,
  Trash2,
  Edit3,
  Save,
  Sparkles,
  Layers,
  FileText,
  Eye,
  EyeOff,
  ShieldCheck,
  Key
} from 'lucide-react';
import { Story, ValueCategory } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  stories: Story[];
  onAddStory: (newStory: Story) => void;
  onUpdateStory: (updatedStory: Story) => void;
  onDeleteStory: (storyId: string) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  stories,
  onAddStory,
  onUpdateStory,
  onDeleteStory,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('admin_logged_in') === 'true';
  });

  // Password state
  const [hasSavedPassword, setHasSavedPassword] = useState<boolean>(() => {
    return Boolean(localStorage.getItem('admin_password'));
  });
  const [showPassword, setShowPassword] = useState(false);

  // First time setup state
  const [setupPassword, setSetupPassword] = useState('');
  const [setupConfirm, setSetupConfirm] = useState('');
  const [setupError, setSetupError] = useState('');

  // Login state
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Change password inside panel state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [changePasswordMsg, setChangePasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [activeTab, setActiveTab] = useState<'nuevo' | 'gestionar' | 'drive' | 'seguridad'>('nuevo');

  // New story form state
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('Juancar Hidalgo');
  const [value, setValue] = useState<ValueCategory>('Honestidad');
  const [ageRange, setAgeRange] = useState('6 - 11 años');
  const [readingTime, setReadingTime] = useState('5 min de lectura');
  const [summary, setSummary] = useState('');
  const [moralLesson, setMoralLesson] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [coloringPdfUrl, setColoringPdfUrl] = useState('');
  const [page1, setPage1] = useState('');
  const [page2, setPage2] = useState('');
  const [page3, setPage3] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // Editing existing story links
  const [editingStoryId, setEditingStoryId] = useState<string | null>(null);
  const [editPdfUrl, setEditPdfUrl] = useState('');
  const [editColoringPdfUrl, setEditColoringPdfUrl] = useState('');

  // Belén Recortable Drive Link
  const [belenDriveUrl, setBelenDriveUrl] = useState<string>(() => {
    return localStorage.getItem('belen_drive_pdf_url') || '';
  });
  const [belenSavedMsg, setBelenSavedMsg] = useState<boolean>(false);

  const handleSaveBelenDriveUrl = () => {
    localStorage.setItem('belen_drive_pdf_url', belenDriveUrl.trim());
    setBelenSavedMsg(true);
    setTimeout(() => setBelenSavedMsg(false), 3000);
  };

  if (!isOpen) return null;

  // Setup first-time password
  const handleSetupPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setSetupError('');

    if (setupPassword.trim().length < 3) {
      setSetupError('La contraseña debe tener al menos 3 caracteres.');
      return;
    }

    if (setupPassword !== setupConfirm) {
      setSetupError('Las contraseñas no coinciden. Por favor, revísalas.');
      return;
    }

    localStorage.setItem('admin_password', setupPassword);
    setHasSavedPassword(true);
    setIsAuthenticated(true);
    sessionStorage.setItem('admin_logged_in', 'true');
    setSetupPassword('');
    setSetupConfirm('');
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    const saved = localStorage.getItem('admin_password');
    if (saved && passwordInput === saved) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_logged_in', 'true');
      setPasswordInput('');
      setPasswordError('');
    } else {
      setPasswordError('Contraseña incorrecta. Inténtalo de nuevo.');
    }
  };

  const handleResetPassword = () => {
    const confirmReset = window.confirm(
      '¿Quieres restablecer la contraseña para configurar una nueva clave de acceso?'
    );
    if (confirmReset) {
      localStorage.removeItem('admin_password');
      sessionStorage.removeItem('admin_logged_in');
      setHasSavedPassword(false);
      setIsAuthenticated(false);
      setPasswordInput('');
      setPasswordError('');
      setSetupPassword('');
      setSetupConfirm('');
      setSetupError('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_logged_in');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setChangePasswordMsg(null);

    const saved = localStorage.getItem('admin_password');
    if (currentPassword !== saved) {
      setChangePasswordMsg({ type: 'error', text: 'La contraseña actual no es correcta.' });
      return;
    }

    if (newPassword.trim().length < 3) {
      setChangePasswordMsg({ type: 'error', text: 'La nueva contraseña debe tener al menos 3 caracteres.' });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setChangePasswordMsg({ type: 'error', text: 'La confirmación no coincide con la nueva contraseña.' });
      return;
    }

    localStorage.setItem('admin_password', newPassword);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setChangePasswordMsg({ type: 'success', text: '¡Contraseña actualizada correctamente!' });
  };

  const handleCreateStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) return;

    const newId = 'cuento-' + Date.now();
    const pages = [];
    if (page1.trim()) {
      pages.push({ pageNumber: 1, text: page1.trim(), illustrationDescription: 'Ilustración de la página 1' });
    }
    if (page2.trim()) {
      pages.push({ pageNumber: 2, text: page2.trim(), illustrationDescription: 'Ilustración de la página 2' });
    }
    if (page3.trim()) {
      pages.push({ pageNumber: 3, text: page3.trim(), illustrationDescription: 'Ilustración de la página 3' });
    }
    if (pages.length === 0) {
      pages.push({ pageNumber: 1, text: summary.trim(), illustrationDescription: 'Ilustración principal del cuento' });
    }

    const newStory: Story = {
      id: newId,
      title: title.trim(),
      author: author.trim() || 'Juancar Hidalgo',
      value: value === 'Todos' ? 'Honestidad' : value,
      valueDescription: `Cultivando la virtud de ${value} en el corazón de los niños.`,
      valueBadgeColor: 'text-amber-800',
      valueBadgeBg: 'bg-amber-100',
      valueBorderColor: 'border-amber-300',
      ageRange,
      readingTime,
      bookType: 'cuento',
      summary: summary.trim(),
      coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600',
      pdfUrl: pdfUrl.trim() || undefined,
      coloringPdfUrl: coloringPdfUrl.trim() || undefined,
      audioUrl: 'https://cdn.freesound.org/previews/573/573381_11861866-lq.mp3',
      audioDuration: '3:50 min',
      moralLesson: moralLesson.trim() || `La virtud de ${value} nos orienta a actuar con rectitud y amor.`,
      discussionQuestions: [
        '¿Qué has aprendido con esta historia?',
        '¿Cómo podemos aplicar este valor en nuestro día a día en casa o en el colegio?',
        '¿Qué momento del cuento te ha parecido más bonito o inspirador?'
      ],
      pages,
      coloringSheet: {
        id: `lamina-${newId}`,
        title: `Lámina de ${title.trim()}`,
        characterName: title.trim(),
        svgId: 'corazon',
      }
    };

    onAddStory(newStory);
    setFormSuccess('¡Cuento añadido con éxito al catálogo!');
    setTitle('');
    setSummary('');
    setMoralLesson('');
    setPdfUrl('');
    setColoringPdfUrl('');
    setPage1('');
    setPage2('');
    setPage3('');

    setTimeout(() => {
      setFormSuccess('');
    }, 4000);
  };

  const handleStartEdit = (story: Story) => {
    setEditingStoryId(story.id);
    setEditPdfUrl(story.pdfUrl || '');
    setEditColoringPdfUrl(story.coloringPdfUrl || '');
  };

  const handleSaveEdit = (story: Story) => {
    onUpdateStory({
      ...story,
      pdfUrl: editPdfUrl.trim() || undefined,
      coloringPdfUrl: editColoringPdfUrl.trim() || undefined,
    });
    setEditingStoryId(null);
  };

  return (
    <div
      id="admin-modal-backdrop"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="admin-modal-container"
        className="bg-white rounded-3xl max-w-4xl w-full border-4 border-amber-300 shadow-2xl relative max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 p-5 sm:p-6 text-white flex items-center justify-between relative shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-md font-bold">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 font-bold text-[10px] uppercase tracking-wider mb-1">
                <span>Zona Privada del Administrador</span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-black tracking-tight leading-none text-amber-100">
                Panel de Administración de Cuentos
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Acceso restringido para añadir cuentos, enlazar PDFs de Google Drive y gestionar la web
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold border border-slate-700 cursor-pointer"
              >
                Cerrar Sesión
              </button>
            )}
            <button
              id="btn-close-admin"
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Cerrar ventana de administración"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        {!isAuthenticated ? (
          !hasSavedPassword ? (
            /* FIRST TIME PASSWORD SETUP */
            <div className="p-6 sm:p-10 flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-inner">
                <ShieldCheck className="w-8 h-8" />
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-slate-900">
                  Crea tu Contraseña de Administrador
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Para que solo tú puedas subir cuentos y modificar enlaces de Google Drive, escribe a continuación una contraseña privada que solo tú conozcas.
                </p>
              </div>

              <form onSubmit={handleSetupPassword} className="w-full space-y-4 text-left">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nueva contraseña privada:
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={setupPassword}
                      onChange={(e) => setSetupPassword(e.target.value)}
                      placeholder="Escribe tu clave secreta"
                      className="w-full pl-4 pr-11 py-3 text-sm rounded-2xl border-2 border-slate-300 focus:border-amber-500 focus:outline-hidden font-medium bg-slate-50"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                      tabIndex={-1}
                      aria-label="Ver u ocultar contraseña"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Repite la contraseña para confirmar:
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={setupConfirm}
                    onChange={(e) => setSetupConfirm(e.target.value)}
                    placeholder="Repite la clave exacta"
                    className="w-full px-4 py-3 text-sm rounded-2xl border-2 border-slate-300 focus:border-amber-500 focus:outline-hidden font-medium bg-slate-50"
                  />
                </div>

                {setupError && (
                  <p className="text-xs text-rose-600 font-bold flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{setupError}</span>
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-98 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Guardar Contraseña y Acceder</span>
                </button>
              </form>
            </div>
          ) : (
            /* STANDARD LOGIN SCREEN (SECURE, NO PASSWORD EXPOSED) */
            <div className="p-6 sm:p-10 flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto shadow-inner">
                <KeyRound className="w-8 h-8" />
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-slate-900">
                  Acceso al Panel de Administración
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Introduce tu contraseña secreta para acceder al panel de gestión de cuentos.
                </p>
              </div>

              <form onSubmit={handleLogin} className="w-full space-y-4">
                <div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={passwordInput}
                      onChange={(e) => {
                        setPasswordInput(e.target.value);
                        if (passwordError) setPasswordError('');
                      }}
                      placeholder="Introduce tu contraseña"
                      className="w-full pl-4 pr-11 py-3 text-center text-base rounded-2xl border-2 border-slate-300 focus:border-amber-500 focus:outline-hidden font-bold bg-slate-50"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                      tabIndex={-1}
                      aria-label="Ver u ocultar contraseña"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {passwordError && (
                    <p className="text-xs text-rose-600 font-bold mt-2 flex items-center justify-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{passwordError}</span>
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-98 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Entrar al Panel de Control</span>
                </button>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleResetPassword}
                    className="text-xs text-slate-400 hover:text-amber-700 underline cursor-pointer"
                  >
                    ¿Olvidaste tu clave? Restablecer contraseña
                  </button>
                </div>
              </form>
            </div>
          )
        ) : (
          /* AUTHENTICATED ADMIN PANEL */
          <>
            {/* Tabs */}
            <div className="flex border-b border-amber-200 bg-amber-50/60 px-4 sm:px-6 overflow-x-auto gap-2 text-xs sm:text-sm font-bold text-slate-600 shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('nuevo')}
                className={`py-3 px-4 border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'nuevo'
                    ? 'border-amber-600 text-amber-900 bg-white rounded-t-xl font-black'
                    : 'border-transparent hover:text-amber-800'
                }`}
              >
                <PlusCircle className="w-4 h-4 text-emerald-600" />
                <span>Añadir Nuevo Cuento</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('gestionar')}
                className={`py-3 px-4 border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'gestionar'
                    ? 'border-amber-600 text-amber-900 bg-white rounded-t-xl font-black'
                    : 'border-transparent hover:text-amber-800'
                }`}
              >
                <Layers className="w-4 h-4 text-amber-600" />
                <span>Gestionar Cuentos y Enlaces ({stories.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('drive')}
                className={`py-3 px-4 border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'drive'
                    ? 'border-amber-600 text-amber-900 bg-white rounded-t-xl font-black'
                    : 'border-transparent hover:text-amber-800'
                }`}
              >
                <FolderOpen className="w-4 h-4 text-sky-600" />
                <span>Guía Paso a Paso de Drive</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('seguridad')}
                className={`py-3 px-4 border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'seguridad'
                    ? 'border-amber-600 text-amber-900 bg-white rounded-t-xl font-black'
                    : 'border-transparent hover:text-amber-800'
                }`}
              >
                <Key className="w-4 h-4 text-purple-600" />
                <span>Seguridad y Clave</span>
              </button>
            </div>

            <div className="p-5 sm:p-8 overflow-y-auto flex-1 space-y-6 text-slate-700 text-sm">
              {/* TAB 1: AÑADIR CUENTO */}
              {activeTab === 'nuevo' && (
                <form onSubmit={handleCreateStory} className="space-y-4">
                  {formSuccess && (
                    <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold flex items-center gap-2 animate-in fade-in">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>{formSuccess}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Título del Cuento *
                      </label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Ej. El Secreto de la Estrella Guía"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-hidden text-sm bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Autor
                      </label>
                      <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Juancar Hidalgo"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-hidden text-sm bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Valor o Virtud Principal
                      </label>
                      <select
                        value={value}
                        onChange={(e) => setValue(e.target.value as ValueCategory)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-hidden text-sm bg-white"
                      >
                        <option value="Honestidad">Honestidad</option>
                        <option value="Valentía">Valentía</option>
                        <option value="Empatía">Empatía</option>
                        <option value="Generosidad">Generosidad</option>
                        <option value="Paciencia">Paciencia</option>
                        <option value="Cooperación">Cooperación</option>
                        <option value="Amistad">Amistad</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Edad recomendada
                        </label>
                        <input
                          type="text"
                          value={ageRange}
                          onChange={(e) => setAgeRange(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Tiempo lectura
                        </label>
                        <input
                          type="text"
                          value={readingTime}
                          onChange={(e) => setReadingTime(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Resumen / Sinopsis del cuento *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      placeholder="Breve introducción de 2 o 3 líneas que enganche al lector..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-hidden text-sm bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Moraleja / Enseñanza clave
                    </label>
                    <input
                      type="text"
                      value={moralLesson}
                      onChange={(e) => setMoralLesson(e.target.value)}
                      placeholder="¿Qué enseñanza transmite esta historia a los niños?"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-hidden text-sm bg-white"
                    />
                  </div>

                  {/* Enlaces de Google Drive */}
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <FolderOpen className="w-4 h-4 text-amber-700" />
                      <span>Enlaces de Google Drive (Descarga de PDF y Lámina)</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Enlace del Cuento en PDF (Google Drive)
                        </label>
                        <input
                          type="url"
                          value={pdfUrl}
                          onChange={(e) => setPdfUrl(e.target.value)}
                          placeholder="https://drive.google.com/file/d/.../view"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Enlace de la Lámina para Colorear (PDF en Google Drive)
                        </label>
                        <input
                          type="url"
                          value={coloringPdfUrl}
                          onChange={(e) => setColoringPdfUrl(e.target.value)}
                          placeholder="https://drive.google.com/file/d/.../view"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Páginas para el lector web */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700">
                      Texto del cuento para leer en la web (Opcional - Páginas para el Lector)
                    </label>
                    <textarea
                      rows={2}
                      value={page1}
                      onChange={(e) => setPage1(e.target.value)}
                      placeholder="Página 1: Érase una vez..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                    />
                    <textarea
                      rows={2}
                      value={page2}
                      onChange={(e) => setPage2(e.target.value)}
                      placeholder="Página 2: Continuación de la historia..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                    />
                    <textarea
                      rows={2}
                      value={page3}
                      onChange={(e) => setPage3(e.target.value)}
                      placeholder="Página 3: Desenlace..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>Publicar Cuento en la Web</span>
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 2: GESTIONAR EXISTENTES */}
              {activeTab === 'gestionar' && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-600">
                    Aquí puedes revisar todos los cuentos del catálogo y actualizar o añadir sus enlaces de Google Drive para la descarga en PDF.
                  </p>

                  {/* Belén Recortable Drive Link Card */}
                  <div className="p-4 rounded-2xl bg-amber-50/70 border-2 border-amber-300/80 shadow-xs flex flex-col gap-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-base">✂️</span>
                        <div>
                          <h4 className="font-display font-bold text-slate-900 text-sm">
                            ⭐ Lámina del Belén Recortable (PDF en Google Drive)
                          </h4>
                          <p className="text-[11px] text-slate-500">
                            Si tienes un archivo PDF del recortable en tu Drive, pega aquí el enlace para que aparezca el botón de descarga directa en PDF.
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleSaveBelenDriveUrl}
                        className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 self-end sm:self-auto cursor-pointer"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Guardar Enlace</span>
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="url"
                        value={belenDriveUrl}
                        onChange={(e) => setBelenDriveUrl(e.target.value)}
                        placeholder="https://drive.google.com/file/d/.../view"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs text-slate-700 focus:outline-hidden focus:border-amber-500"
                      />
                    </div>

                    {belenSavedMsg && (
                      <div className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>¡Enlace del Belén Recortable guardado correctamente!</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    {stories.map((story) => (
                      <div
                        key={story.id}
                        className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col gap-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                                {story.value}
                              </span>
                              <h4 className="font-display font-bold text-slate-900 text-base">
                                {story.title}
                              </h4>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">
                              Por {story.author || 'Juancar Hidalgo'} • {story.readingTime}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-auto">
                            {editingStoryId === story.id ? (
                              <button
                                type="button"
                                onClick={() => handleSaveEdit(story)}
                                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                              >
                                <Save className="w-3.5 h-3.5" />
                                <span>Guardar</span>
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleStartEdit(story)}
                                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1 cursor-pointer"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                                <span>Editar Enlaces Drive</span>
                              </button>
                            )}

                            {story.id.startsWith('cuento-') && (
                              <button
                                type="button"
                                onClick={() => onDeleteStory(story.id)}
                                className="p-1.5 rounded-xl text-rose-600 hover:bg-rose-50 cursor-pointer"
                                title="Eliminar este cuento añadido"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Editor de enlaces inline */}
                        {editingStoryId === story.id ? (
                          <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 space-y-2 text-xs">
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">
                                Enlace de Google Drive al Cuento en PDF:
                              </label>
                              <input
                                type="url"
                                value={editPdfUrl}
                                onChange={(e) => setEditPdfUrl(e.target.value)}
                                placeholder="https://drive.google.com/file/d/.../view"
                                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                              />
                            </div>
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">
                                Enlace de Google Drive a la Lámina para Colorear:
                              </label>
                              <input
                                type="url"
                                value={editColoringPdfUrl}
                                onChange={(e) => setEditColoringPdfUrl(e.target.value)}
                                placeholder="https://drive.google.com/file/d/.../view"
                                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                            <span className="flex items-center gap-1">
                              <strong>PDF Cuento:</strong>{' '}
                              {story.pdfUrl ? (
                                <a
                                  href={story.pdfUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-sky-600 hover:underline inline-flex items-center gap-0.5"
                                >
                                  <span>Enlazado</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              ) : (
                                <span className="text-slate-400 italic">No enlazado aún</span>
                              )}
                            </span>
                            <span className="text-slate-300">•</span>
                            <span className="flex items-center gap-1">
                              <strong>Lámina PDF:</strong>{' '}
                              {story.coloringPdfUrl ? (
                                <a
                                  href={story.coloringPdfUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-sky-600 hover:underline inline-flex items-center gap-0.5"
                                >
                                  <span>Enlazada</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              ) : (
                                <span className="text-slate-400 italic">No enlazada aún</span>
                              )}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: GUIA PASO A PASO */}
              {activeTab === 'drive' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200">
                    <h4 className="font-display font-bold text-slate-900 text-base mb-1">
                      Cómo obtener el enlace correcto de Google Drive
                    </h4>
                    <p className="text-xs text-slate-600">
                      Sigue estos 3 pasos rápidos en tu ordenador o móvil para que cualquier visitante de la web pueda descargar o ver tu archivo sin pedir permisos de acceso:
                    </p>
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                      <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs inline-flex items-center justify-center font-bold">1</span>
                      <h5 className="font-bold text-slate-900">Sube el archivo a Google Drive</h5>
                      <p className="text-xs text-slate-600">
                        Entra en <strong>drive.google.com</strong> y arrastra el archivo PDF de tu cuento o de la lámina para colorear a tu carpeta de cuentos.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                      <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs inline-flex items-center justify-center font-bold">2</span>
                      <h5 className="font-bold text-slate-900">Cambia la privacidad a &quot;Cualquier persona con el enlace&quot;</h5>
                      <p className="text-xs text-slate-600">
                        Haz clic derecho sobre el archivo &gt; <strong>Compartir</strong> &gt; <strong>Compartir</strong>. En el apartado <em>&quot;Acceso general&quot;</em>, cambia de <em>&quot;Restringido&quot;</em> a <strong>&quot;Cualquier persona con el enlace&quot;</strong> (como Lector).
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                      <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs inline-flex items-center justify-center font-bold">3</span>
                      <h5 className="font-bold text-slate-900">Copia el enlace y pégalo en este panel</h5>
                      <p className="text-xs text-slate-600">
                        Pulsa <strong>&quot;Copiar enlace&quot;</strong> y pégalo en la casilla de tu cuento en este panel de administración. ¡Al guardarlo quedará activo de inmediato para todos los usuarios de la web!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: SEGURIDAD Y CLAVE */}
              {activeTab === 'seguridad' && (
                <div className="space-y-6 max-w-lg mx-auto animate-in fade-in duration-150">
                  <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200">
                    <div className="flex items-center gap-2 text-purple-900 font-bold mb-1">
                      <Key className="w-5 h-5 text-purple-600" />
                      <h4 className="font-display text-base font-bold">Cambiar Contraseña de Administrador</h4>
                    </div>
                    <p className="text-xs text-purple-700 leading-relaxed">
                      Elige una nueva contraseña que recuerdes con facilidad. Solo quien conozca esta clave podrá acceder a este panel de administración.
                    </p>
                  </div>

                  <form onSubmit={handleChangePassword} className="space-y-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Contraseña actual:
                      </label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Escribe la clave actual"
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-hidden font-medium bg-slate-50"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Nueva contraseña:
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Escribe la nueva clave"
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-hidden font-medium bg-slate-50"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Confirmar nueva contraseña:
                      </label>
                      <input
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        placeholder="Repite la nueva clave"
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-hidden font-medium bg-slate-50"
                        required
                      />
                    </div>

                    {changePasswordMsg && (
                      <div
                        className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
                          changePasswordMsg.type === 'success'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                            : 'bg-rose-50 text-rose-800 border border-rose-300'
                        }`}
                      >
                        {changePasswordMsg.type === 'success' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        )}
                        <span>{changePasswordMsg.text}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 active:scale-98 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Guardar Nueva Contraseña</span>
                    </button>
                  </form>
                </div>
              )}
            </div>
          </>
        )}

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>
            🔒 Zona de Administración • Cuentos con Valores
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
