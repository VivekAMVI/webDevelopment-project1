import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import { EditIcon,DeleteIcon } from '@chakra-ui/icons'
import React, { useState } from 'react'
import { useProductStore } from '../store/product'

const ProductCard = ({product}) => {
    const [updatedProduct,setUpdatedProduct]=useState(product);
    const textColor=useColorModeValue("gray.800","gray.200")
    const bg=useColorModeValue("white","gray.800")
    const {deleteProduct}=useProductStore()
    const {isOpen,onOpen,onClose}=useDisclosure();
    const toast=useToast()
    const handleDeleteProduct=async(pid)=>{
        const {success,message}=await deleteProduct(pid);
        if(!success){
            toast({
                title:'Error',
                description:message,
                status:'error',
                duration:3000,
                isClosable:true
            })
        }else{
            toast({
                title:'Success',
                description:message,
                status:'success',
                duration:3000,
                isClosable:true
            })
        }
    }
    const {updateProduct}=useProductStore();
    const handleUpdateProduct=async(pid,updatedProduct)=>{
        const{success,message}=updateProduct(pid,updatedProduct);
        onClose();
        toast({
                title:'Success',
                description:"Product Updated Successfully",
                status:'success',
                duration:3000,
                isClosable:true
            })
    }
  return (
    <Box shadow='lg' rounded='lg' overflow='hidden' transition='all 0.3s' _hover={{transform:'translateY(-5px)',shadow:'xl'}} bg={bg}>
        <Image src={product.image} alt={product.name} h={48} w={'full'} objectFit='cover' />
        <Box p={4}>
            <Heading as='h3' size='md' mb={2}>
                {product.name}
            </Heading>
            <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                ₹{product.price}
            </Text>
            <HStack spacing={2}>
                <IconButton icon={<EditIcon />}  onClick={onOpen} colorScheme='blue'/>
                <IconButton icon={<DeleteIcon />} onClick={()=>handleDeleteProduct(product._id)} colorScheme='red' />
            </HStack>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update Product</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4}>
                        <Input placeholder='Product Name' name='name' value={updatedProduct.name} onChange={(e)=>setUpdatedProduct({...updateProduct,name:e.target.value})}/>
                        <Input placeholder='Price' name='price' type='number' value={updatedProduct.price}  onChange={(e)=>setUpdatedProduct({...updateProduct,price:e.target.value})}/>
                        <Input placeholder='Image URL' name='image' value={updatedProduct.image} onChange={(e)=>setUpdatedProduct({...updateProduct,image:e.target.value})}/>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={()=>handleUpdateProduct(product._id,updatedProduct)}>Update</Button>
                    <Button variant='ghost' onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </Box>
  )
}

export default ProductCard