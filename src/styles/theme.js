export function opacity (color, value) {
  const rgb = color.match(/(\d{1,3}), (\d{1,3}), (\d{1,3})/)
  return `rgba(${rgb[0]}, ${value})`
}

export default {
  /* Primary colors */
  lochmara: 'rgb(0, 133, 202)', // #0085ca
  pistachio: 'rgb(139, 209, 0)', //#8BD100

  DAGENS: '#ffdb4d',
  PERFORMANCE: '#0085ca',
  HELG: '#ffdb4d',
  FITNESS: 'rgb(0, 179, 0)', // #00b300
  MASTODONT: '#ffdb4d',
  TRYOUT: '#252525',
}
