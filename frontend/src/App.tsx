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
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { backend } from 'declarations/backend';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#fafafa',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

function App() {
  const [product, setProduct] = useState(null);
  const [value, setValue] = useState(0);

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
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            iPhone Android Edition
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        {product && (
          <>
            <Box sx={{ my: 4 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {product.description}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={{ mt: 2 }}
                startIcon={<ShoppingCartIcon />}
              >
                Buy Now
              </Button>
            </Box>

            <Box sx={{ my: 4 }}>
              <CardMedia
                component="img"
                height="300"
                image="https://loremflickr.com/g/300/300/iphone,android?lock=1"
                alt="iPhone Android Edition"
              />
            </Box>

            <Box sx={{ my: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Features
              </Typography>
              <List>
                {product.features.map((feature, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={feature} />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box sx={{ my: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom>
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
      <Fab color="secondary" aria-label="add" style={{ position: 'fixed', bottom: 80, right: 16 }}>
        <AddIcon />
      </Fab>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Info" icon={<InfoIcon />} />
        <BottomNavigationAction label="Cart" icon={<ShoppingCartIcon />} />
      </BottomNavigation>
    </ThemeProvider>
  );
}

export default App;
