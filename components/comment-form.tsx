'use client'

export function CommentForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('نظر شما ثبت شد و پس از بررسی نمایش داده خواهد شد.')
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="نام شما"
          className="border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <input
          type="email"
          placeholder="ایمیل (نمایش داده نمی‌شود)"
          className="border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          dir="ltr"
        />
      </div>
      <textarea
        placeholder="نظر خود را بنویسید..."
        rows={4}
        className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
      />
      <button
        type="submit"
        className="px-5 py-2 bg-[#DC2626] text-white rounded-md text-sm font-medium hover:bg-[#b91c1c] transition-colors"
      >
        ارسال نظر
      </button>
    </form>
  )
}
