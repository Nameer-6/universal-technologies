/**
 * Builds the downloadable /portfolio files (PDF and Excel) in the browser.
 *
 * The libraries are imported on demand, so they only load when someone actually
 * clicks Export — the page itself doesn't carry their weight.
 */

export type PortfolioExportContent = {
  title: string
  lead: string
  stages: { title: string; text: string }[]
  engagements: { tag: string; title: string; text: string }[]
  services: { title: string; summary: string; stacks: string[] }[]
  industries: readonly string[]
  clients: { name: string; industry?: string; country?: string; does?: string }[]
  product: { name: string; tagline: string; features: readonly string[]; url: string }
}

const FILE_NAME = 'universal-technologies-portfolio'
const COMPANY = 'Universal Technologies'
const BRAND: [number, number, number] = [227, 28, 35]

export async function exportPortfolioPdf(content: PortfolioExportContent) {
  const [{ jsPDF }, { autoTable }] = await Promise.all([import('jspdf'), import('jspdf-autotable')])

  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const margin = 48
  const width = doc.internal.pageSize.getWidth() - margin * 2
  let y = margin

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.setTextColor(...BRAND)
  doc.text(`${COMPANY.toUpperCase()} · PORTFOLIO`, margin, y)
  y += 26

  doc.setFontSize(22)
  doc.setTextColor(12, 15, 20)
  doc.text(content.title, margin, y)
  y += 20

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.setTextColor(91, 101, 115)
  const leadLines = doc.splitTextToSize(content.lead, width)
  doc.text(leadLines, margin, y)
  y += leadLines.length * 14 + 10

  const table = (heading: string, head: string[], body: string[][]) => {
    if (y > doc.internal.pageSize.getHeight() - 120) {
      doc.addPage()
      y = margin
    }
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(13)
    doc.setTextColor(12, 15, 20)
    doc.text(heading, margin, y + 14)
    autoTable(doc, {
      startY: y + 22,
      head: [head],
      body,
      margin: { left: margin, right: margin },
      styles: { fontSize: 9.5, cellPadding: 6, valign: 'top', textColor: [28, 36, 48] },
      headStyles: { fillColor: BRAND, textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [247, 247, 245] },
    })
    y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 24
  }

  table(
    'How we deliver',
    ['Stage', 'What happens'],
    content.stages.map((stage, index) => [`0${index + 1} · ${stage.title}`, stage.text]),
  )
  table(
    "Where we've delivered",
    ['Industry', 'Focus', 'What we delivered'],
    content.engagements.map((engagement) => [engagement.tag, engagement.title, engagement.text]),
  )
  table(
    'Services',
    ['Service', 'What it covers', 'Stack'],
    content.services.map((service) => [service.title, service.summary, service.stacks.join(', ')]),
  )
  table(
    'Clients our team has supported',
    ['Client', 'Industry', 'Country', 'What they do'],
    content.clients.map((client) => [client.name, client.industry ?? '', client.country ?? '', client.does ?? '']),
  )
  table(
    `Our product — ${content.product.name}`,
    [content.product.tagline],
    [...content.product.features.map((feature) => [feature]), [content.product.url]],
  )

  const pages = doc.getNumberOfPages()
  for (let page = 1; page <= pages; page += 1) {
    doc.setPage(page)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.5)
    doc.setTextColor(154, 161, 172)
    const footerY = doc.internal.pageSize.getHeight() - 24
    doc.text(`${COMPANY} · Portfolio`, margin, footerY)
    doc.text(`${page} / ${pages}`, margin + width, footerY, { align: 'right' })
  }

  doc.save(`${FILE_NAME}.pdf`)
}

export async function exportPortfolioXlsx(content: PortfolioExportContent) {
  const { default: writeExcelFile } = await import('write-excel-file/browser')

  const header = (labels: string[]) =>
    labels.map((value) => ({ value, fontWeight: 'bold' as const, color: '#ffffff', backgroundColor: '#e31c23' }))

  await writeExcelFile([
    {
      sheet: 'Overview',
      data: [
        [{ value: `${COMPANY} — Portfolio`, fontWeight: 'bold' as const, fontSize: 16 }],
        [content.title],
        [{ value: content.lead, wrap: true }],
        [null],
        [{ value: 'Industries', fontWeight: 'bold' as const }],
        ...content.industries.map((industry) => [industry]),
      ],
      columns: [{ width: 90 }],
    },
    {
      sheet: 'Delivery stages',
      data: [
        header(['Stage', 'Title', 'What happens']),
        ...content.stages.map((stage, index) => [index + 1, stage.title, { value: stage.text, wrap: true }]),
      ],
      columns: [{ width: 8 }, { width: 28 }, { width: 90 }],
      stickyRowsCount: 1,
    },
    {
      sheet: 'Industries',
      data: [
        header(['Industry', 'Focus', 'What we delivered']),
        ...content.engagements.map((engagement) => [
          engagement.tag,
          engagement.title,
          { value: engagement.text, wrap: true },
        ]),
      ],
      columns: [{ width: 18 }, { width: 44 }, { width: 90 }],
      stickyRowsCount: 1,
    },
    {
      sheet: 'Services',
      data: [
        header(['Service', 'What it covers', 'Stack']),
        ...content.services.map((service) => [
          service.title,
          { value: service.summary, wrap: true },
          service.stacks.join(', '),
        ]),
      ],
      columns: [{ width: 28 }, { width: 80 }, { width: 50 }],
      stickyRowsCount: 1,
    },
    {
      sheet: 'Clients',
      data: [
        header(['Client', 'Industry', 'Country', 'What they do']),
        ...content.clients.map((client) => [
          client.name,
          client.industry ?? null,
          client.country ?? null,
          client.does ?? null,
        ]),
      ],
      columns: [{ width: 24 }, { width: 26 }, { width: 14 }, { width: 80 }],
      stickyRowsCount: 1,
    },
    {
      sheet: 'Product',
      data: [
        [{ value: content.product.name, fontWeight: 'bold' as const, fontSize: 14 }],
        [content.product.tagline],
        [null],
        header(['Features']),
        ...content.product.features.map((feature) => [feature]),
        [null],
        [content.product.url],
      ],
      columns: [{ width: 80 }],
    },
  ]).toFile(`${FILE_NAME}.xlsx`)
}
