'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Save } from 'lucide-react'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'تریبون',
    siteDescription: 'پایگاه خبری جامع برای آخرین اخبار ایران و جهان',
    siteEmail: 'miladjoodi@gmail.com',
    sitePhone: '',
    siteAddress: '',
    githubRepo: 'https://github.com/MiladJoodi/Tariboon-News',
    linkedinProfile: 'https://www.linkedin.com/in/joodi/',
    twitterHandle: '',
  })

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('تنظیمات ذخیره شد')
  }

  const fields = [
    { key: 'siteName', label: 'نام سایت' },
    { key: 'siteDescription', label: 'توضیحات سایت' },
    { key: 'siteEmail', label: 'ایمیل', dir: 'ltr' },
    { key: 'sitePhone', label: 'تلفن' },
    { key: 'siteAddress', label: 'آدرس' },
    { key: 'githubRepo', label: 'گیت‌هاب پروژه', dir: 'ltr' },
    { key: 'linkedinProfile', label: 'لینکدین', dir: 'ltr' },
    { key: 'twitterHandle', label: 'توییتر', dir: 'ltr' },
  ] as const

  return (
    <div className="space-y-4 max-w-2xl">
      <h1 className="text-2xl font-black text-foreground">تنظیمات سایت</h1>
      <form onSubmit={handleSave} className="bg-card border border-border rounded-xl p-6 space-y-4">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-foreground mb-1.5">{field.label}</label>
            <input
              type="text"
              value={settings[field.key]}
              onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })}
              className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              dir={'dir' in field ? field.dir : undefined}
            />
          </div>
        ))}
        <button type="submit" className="flex items-center gap-2 px-5 py-2.5 bg-[#DC2626] text-white rounded-lg text-sm font-medium hover:bg-[#b91c1c] transition-colors"><Save className="w-4 h-4" />ذخیره تنظیمات</button>
      </form>
    </div>
  )
}