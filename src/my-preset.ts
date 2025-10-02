export const myPreset = {
  primitive: {
    /*sky: {
      '50': '#fdfbe9',
      '100': '#fcf9c5',
      '200': '#fbf08d',
      '300': '#f8e04c',
      '400': '#f3cd1c',
      '500': '#e6b70f',
      '600': '#c48d0a',
      '700': '#9c650c',
      '800': '#815012',
      '900': '#6e4115',
      '950': '#402108',
    },*/
    purple: {
      '50': '#f5f3f1',
      '100': '#e6e0db',
      '200': '#cfc3b9',
      '300': '#b49d90',
      '400': '#9e8071',
      '500': '#8f6f63',
      '600': '#7a5c54',
      '700': '#634945',
      '800': '#553f3e',
      '900': '#3d2e2e',
      '950': '#2a1e1f',
    },
  },
  semantic: {
    primary: {
      50: '#f5f6f8',
      100: '#cfd3dd',
      200: '#a9b0c2',
      300: '#828ea8',
      400: '#5c6b8d',
      500: '#364872',
      600: '#2e3d61',
      700: '#263250',
      800: '#1e283f',
      900: '#161d2e',
      950: '#0e121d',
    },
  },
  components: {
    toast: {
      colorScheme: {
        light: {
          info: {
            background: '{sky.500}',
            borderColor: '{sky.500}',
            color: '{surface.0}',
            detailColor: '{surface.0}',
            shadow: '0 4px 8px 0 rgba(1, 8, 4, 0.04)',
            closeButton: {
              hoverBackground: '{sky.700}',
              focusRing: {
                color: '{sky.600}',
                shadow: '0 0 0 0 #00000000',
              },
            },
          },
          error: {
            background: '{red.500}',
            borderColor: '{red.500}',
            color: '{surface.0}',
            detailColor: '{surface.0}',
            shadow: '0 4px 8px 0 rgba(1, 8, 4, 0.04)',
            closeButton: {
              hoverBackground: '{red.700}',
              focusRing: {
                color: '{red.600}',
                shadow: '0 0 0 0 #00000000',
              },
            },
          },
          success: {
            background: '{green.500}',
            borderColor: '{green.500}',
            color: '{surface.0}',
            detailColor: '{surface.0}',
            shadow: '0 4px 8px 0 rgba(1, 8, 4, 0.04)',
            closeButton: {
              hoverBackground: '{green.700}',
              focusRing: {
                color: '{green.600}',
                shadow: '0 0 0 0 #00000000',
              },
            },
          },
          warn: {
            background: '{orange.500}',
            borderColor: '{orange.500}',
            color: '{surface.0}',
            detailColor: '{surface.0}',
            shadow: '0 4px 8px 0 rgba(1, 8, 4, 0.04)',
            closeButton: {
              hoverBackground: '{orange.700}',
              focusRing: {
                color: '{orange.600}',
                shadow: '0 0 0 0 #00000000',
              },
            },
          },
          secondary: {
            background: '{surface.500}',
            borderColor: '{surface.500}',
            color: '{surface.0}',
            detailColor: '{surface.0}',
            shadow: '0 4px 8px 0 rgba(1, 8, 4, 0.04)',
            closeButton: {
              hoverBackground: '{surface.700}',
              focusRing: {
                color: '{surface.600}',
                shadow: '0 0 0 0 #00000000',
              },
            },
          },
          contrast: {
            background: '{surface.900}',
            borderColor: '{surface.950}',
            color: '{surface.0}',
            detailColor: '{surface.0}',
            shadow: '0 4px 8px 0 rgba(0, 0, 1, 0.04)',
            closeButton: {
              hoverBackground: '{surface.800}',
              focusRing: {
                color: '{surface.50}',
                shadow: '0 0 0 0 #00000000',
              },
            },
          },
        },
        dark: {
          info: {
            background: '{sky.500}',
            borderColor: '{sky.500}',
            color: '{surface.0}',
            detailColor: '{surface.0}',
            shadow: '0 4px 8px 0 rgba(1, 8, 4, 0.04)',
            closeButton: {
              hoverBackground: '{sky.700}',
              focusRing: {
                color: '{sky.600}',
                shadow: '0 0 0 0 #00000000',
              },
            },
          },
          error: {
            background: '{red.500}',
            borderColor: '{red.500}',
            color: '{surface.0}',
            detailColor: '{surface.0}',
            shadow: '0 4px 8px 0 rgba(1, 8, 4, 0.04)',
            closeButton: {
              hoverBackground: '{red.700}',
              focusRing: {
                color: '{red.600}',
                shadow: '0 0 0 0 #00000000',
              },
            },
          },
          success: {
            background: '{green.500}',
            borderColor: '{green.500}',
            color: '{surface.0}',
            detailColor: '{surface.0}',
            shadow: '0 4px 8px 0 rgba(1, 8, 4, 0.04)',
            closeButton: {
              hoverBackground: '{green.700}',
              focusRing: {
                color: '{green.600}',
                shadow: '0 0 0 0 #00000000',
              },
            },
          },
          warn: {
            background: '{orange.500}',
            borderColor: '{orange.500}',
            color: '{surface.0}',
            detailColor: '{surface.0}',
            shadow: '0 4px 8px 0 rgba(1, 8, 4, 0.04)',
            closeButton: {
              hoverBackground: '{orange.700}',
              focusRing: {
                color: '{orange.600}',
                shadow: '0 0 0 0 #00000000',
              },
            },
          },
          secondary: {
            background: '{surface.500}',
            borderColor: '{surface.500}',
            color: '{surface.0}',
            detailColor: '{surface.0}',
            shadow: '0 4px 8px 0 rgba(1, 8, 4, 0.04)',
            closeButton: {
              hoverBackground: '{surface.700}',
              focusRing: {
                color: '{surface.600}',
                shadow: '0 0 0 0 #00000000',
              },
            },
          },
          contrast: {
            background: '{surface.900}',
            borderColor: '{surface.950}',
            color: '{surface.0}',
            detailColor: '{surface.0}',
            shadow: '0 4px 8px 0 rgba(0, 0, 1, 0.04)',
            closeButton: {
              hoverBackground: '{surface.800}',
              focusRing: {
                color: '{surface.50}',
                shadow: '0 0 0 0 #00000000',
              },
            },
          },
        },
      },
    },
    button: {
      colorScheme: {
        light: {
          root: {
            secondary: {
              background: '{surface.200}',
              hoverBackground: '{surface.300}',
              activeBackground: '{surface.400}',
              borderColor: '{surface.200}',
              hoverBorderColor: '{surface.300}',
              activeBorderColor: '{surface.400}',
              color: '{surface.800}',
            },
          },
        },
      },
    },
    toggleswitch: {
      colorScheme: {
        light: {
          root: {
            handle: {
              background: '{green.500}',
              disabledBackground: '{green.200}',
              hoverBackground: '{green.800}',
              checkedBackground: '{red.500}',
              checkedHoverBackground: '{red.800}',
              color: '{text.muted.color}',
              hoverColor: '{text.color}',
              checkedColor: '{surface.0}',
              checkedHoverColor: '{surface.0}',
            },
          },
        },
        dark: {
          root: {
            handle: {
              background: '{green.500}',
              disabledBackground: '{green.200}',
              hoverBackground: '{green.800}',
              checkedBackground: '{red.500}',
              checkedHoverBackground: '{red.800}',
              color: '{text.muted.color}',
              hoverColor: '{text.color}',
              checkedColor: '{surface.0}',
              checkedHoverColor: '{surface.0}',
            },
          },
        },
      },
    },
  },
}
