import React, { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { backend } from 'declarations/backend';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#0071E3',
    },
    background: {
      default: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

function App() {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = await backend.getProduct(BigInt(0));
        if (result) {
          setProduct(result);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Apple
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        {product && (
          <>
            <Box sx={{ my: 4 }}>
              <Typography variant="h2" component="h1" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="h5" component="h2" gutterBottom>
                {product.description}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={{ mt: 2 }}
              >
                Buy Now
              </Button>
            </Box>

            <Box sx={{ my: 4 }}>
              <CardMedia
                component="img"
                height="500"
                image="https://loremflickr.com/g/1200/500/macbook?lock=1"
                alt="MacBook Pro"
              />
            </Box>

            <Box sx={{ my: 4 }}>
              <Typography variant="h4" component="h2" gutterBottom>
                Features
              </Typography>
              <Grid container spacing={3}>
                {product.features.map((feature, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" component="div">
                          {feature}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box sx={{ my: 4 }}>
              <Typography variant="h4" component="h2" gutterBottom>
                Technical Specifications
              </Typography>
              <List>
                {product.specs.map(([key, value], index) => (
                  <ListItem key={index}>
                    <ListItemText primary={key} secondary={value} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
