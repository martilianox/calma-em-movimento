'use client'

import { useState } from 'react'
import { ArrowLeft, Plus, Phone, Mail, User, Trash2 } from 'lucide-react'
import type { Screen } from '../page'

interface EmergencyContactsProps {
  navigate: (screen: Screen) => void
}

interface Contact {
  id: number
  name: string
  relationship: string
  phone: string
  email?: string
}

export function EmergencyContacts({ navigate }: EmergencyContactsProps) {
  const [contacts, setContacts] = useState<Contact[]>([])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newContact, setNewContact] = useState({
    name: '',
    relationship: '',
    phone: '',
    email: ''
  })

  const handleAddContact = () => {
    if (newContact.name && newContact.phone && contacts.length < 5) {
      setContacts([
        ...contacts,
        {
          id: Date.now(),
          ...newContact
        }
      ])
      setNewContact({ name: '', relationship: '', phone: '', email: '' })
      setShowAddForm(false)
    }
  }

  const handleDeleteContact = (id: number) => {
    setContacts(contacts.filter(c => c.id !== id))
  }

  return (
    <div className="min-h-screen pb-6" style={{ backgroundColor: '#F7F9FA' }}>
      {/* Header */}
      <div className="p-6 space-y-3">
        <button
          onClick={() => navigate('dashboard')}
          className="flex items-center gap-2 transition-opacity hover:opacity-70"
          style={{ color: '#5C6F82' }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Voltar</span>
        </button>
        
        <div>
          <h1 className="text-2xl font-semibold mb-2" style={{ color: '#5C6F82' }}>
            Quem você quer ter por perto nesses momentos?
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: '#95A8B8' }}>
            Esses contatos só aparecem para você. Aqui é um espaço seguro.
          </p>
        </div>
      </div>

      <div className="px-6 space-y-4">
        {/* CVV Banner */}
        <div 
          className="p-5 rounded-2xl"
          style={{ backgroundColor: '#E7CBCB' }}
        >
          <div className="flex items-start gap-3">
            <Phone className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#5C6F82' }} />
            <div>
              <h3 className="font-medium mb-1" style={{ color: '#5C6F82' }}>
                CVV - Centro de Valorização da Vida
              </h3>
              <p className="text-2xl font-semibold mb-2" style={{ color: '#5C6F82' }}>
                188
              </p>
              <p className="text-sm" style={{ color: '#5C6F82', opacity: 0.8 }}>
                Apoio emocional gratuito, 24 horas por dia
              </p>
            </div>
          </div>
        </div>

        {/* Contacts list */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium" style={{ color: '#5C6F82' }}>
              Seus contatos ({contacts.length}/5)
            </h2>
            {contacts.length < 5 && (
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: '#A8D5C2', color: '#5C6F82' }}
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Adicionar</span>
              </button>
            )}
          </div>

          {/* Add form */}
          {showAddForm && (
            <div 
              className="p-4 rounded-xl space-y-3"
              style={{ backgroundColor: '#FFFFFF', border: '2px solid #DDE2E6' }}
            >
              <input
                type="text"
                placeholder="Nome"
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                className="w-full p-3 rounded-lg focus:outline-none focus:ring-2"
                style={{ backgroundColor: '#F7F9FA', border: '2px solid #DDE2E6', color: '#5C6F82' }}
              />
              <select
                value={newContact.relationship}
                onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                className="w-full p-3 rounded-lg focus:outline-none focus:ring-2"
                style={{ backgroundColor: '#F7F9FA', border: '2px solid #DDE2E6', color: '#5C6F82' }}
              >
                <option value="">Selecione a relação</option>
                <option value="amigo">Amigo</option>
                <option value="familiar">Familiar</option>
                <option value="terapeuta">Terapeuta</option>
                <option value="emergência">Emergência</option>
              </select>
              <input
                type="tel"
                placeholder="Telefone"
                value={newContact.phone}
                onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                className="w-full p-3 rounded-lg focus:outline-none focus:ring-2"
                style={{ backgroundColor: '#F7F9FA', border: '2px solid #DDE2E6', color: '#5C6F82' }}
              />
              <input
                type="email"
                placeholder="E-mail (opcional)"
                value={newContact.email}
                onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                className="w-full p-3 rounded-lg focus:outline-none focus:ring-2"
                style={{ backgroundColor: '#F7F9FA', border: '2px solid #DDE2E6', color: '#5C6F82' }}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAddContact}
                  disabled={!newContact.name || !newContact.phone || !newContact.relationship}
                  className="flex-1 py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50"
                  style={{ backgroundColor: '#A8D5C2', color: '#5C6F82' }}
                >
                  Salvar contato
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 py-3 rounded-lg font-medium"
                  style={{ backgroundColor: '#DDE2E6', color: '#5C6F82' }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* Contacts */}
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="p-4 rounded-xl"
              style={{ backgroundColor: '#FFFFFF', border: '2px solid #DDE2E6' }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div 
                    className="p-2 rounded-full"
                    style={{ backgroundColor: '#C7DDF2' }}
                  >
                    <User className="w-5 h-5" style={{ color: '#5C6F82' }} />
                  </div>
                  <div>
                    <h3 className="font-medium" style={{ color: '#5C6F82' }}>
                      {contact.name}
                    </h3>
                    <p className="text-sm capitalize" style={{ color: '#95A8B8' }}>
                      {contact.relationship}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteContact(contact.id)}
                  className="p-2 rounded-lg transition-colors hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" style={{ color: '#95A8B8' }} />
                </button>
              </div>

              <div className="space-y-2">
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-2 p-3 rounded-lg transition-all duration-300 hover:scale-[1.02]"
                  style={{ backgroundColor: '#A8D5C2' }}
                >
                  <Phone className="w-4 h-4" style={{ color: '#5C6F82' }} />
                  <span className="text-sm font-medium" style={{ color: '#5C6F82' }}>
                    Ligar para {contact.name.split(' ')[0]} agora
                  </span>
                </a>
                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-2 p-2 rounded-lg transition-colors"
                    style={{ backgroundColor: '#F7F9FA' }}
                  >
                    <Mail className="w-4 h-4" style={{ color: '#5C6F82' }} />
                    <span className="text-sm" style={{ color: '#5C6F82' }}>
                      {contact.email}
                    </span>
                  </a>
                )}
              </div>
            </div>
          ))}

          {contacts.length === 0 && !showAddForm && (
            <div 
              className="p-6 rounded-xl text-center space-y-3"
              style={{ backgroundColor: '#FFFFFF', border: '2px solid #DDE2E6' }}
            >
              <p className="text-sm leading-relaxed" style={{ color: '#5C6F82' }}>
                Você ainda não adicionou nenhum contato.
              </p>
              <p className="text-xs leading-relaxed" style={{ color: '#95A8B8' }}>
                Adicione até 5 pessoas que podem te ajudar em momentos difíceis.
              </p>
            </div>
          )}
        </div>

        {/* Info */}
        <div 
          className="p-4 rounded-xl"
          style={{ backgroundColor: '#F3EDE7' }}
        >
          <p className="text-xs leading-relaxed" style={{ color: '#95A8B8' }}>
            💛 Esses contatos ficam salvos apenas no seu dispositivo e podem ser acessados rapidamente no modo crise.
          </p>
        </div>
      </div>
    </div>
  )
}
