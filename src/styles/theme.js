export function opacity (color, value) {
  const rgb = color.match(/(\d{1,3}), (\d{1,3}), (\d{1,3})/)
  return `rgba(${rgb[0]}, ${value})`
}

export default {
  /* Primary colors */
  lochmara: 'rgb(0, 133, 202)', // #0085ca

  DAGENS: '#ffdb4d',
  PERFORMANCE: '#0085ca',
  HELG: '#ffdb4d',
  FITNESS: '#00b300',
  MASTODONT: '#ffdb4d',
  TRYOUT: '#252525',
}
